import { validateTicket } from "../../lib/cas";
import {
  type ApiEvent,
  type ApiResult,
  error,
  getUser,
  json,
  notImplemented,
  withErrors,
} from "../../lib/http";
import {
  bearerToken,
  issueToken,
  nowSeconds,
  SESSION_MAX_SECONDS,
  verifyToken,
} from "../../lib/jwt";
import { findUser, upsertUser } from "../../lib/users";

/** Girişten sonra geri dönülebilecek siteler (template: AllowedOrigins). */
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function redirect(location: string): ApiResult {
  return {
    statusCode: 302,
    headers: { location, "cache-control": "no-store" },
    body: "",
  };
}

/**
 * AuthController: ESN Accounts (CAS) girişi, token üretme ve yenileme.
 *
 * Akış (ESN Assembly ile aynı):
 * 1. Site → https://accounts.esn.org/cas/login?service=<API>/auth/callback?returnTo=<site>
 * 2. ESN, tarayıcıyı GET /auth/callback?returnTo=…&ticket=ST-… adresine döndürür
 * 3. Ticket ESN'e doğrulatılır, kullanıcı users tablosuna yazılır, JWT üretilir
 * 4. Tarayıcı <site>/auth/callback#token=…&expiresAt=… adresine yönlendirilir
 *
 * Logout sadece frontend'de: token silinir. ESN Accounts oturumuna dokunulmaz.
 */
export const handler = withErrors(async (event: ApiEvent) => {
  switch (event.routeKey) {
    case "GET /auth/callback": {
      const params = event.queryStringParameters ?? {};
      const returnTo = params.returnTo ?? "";
      if (!ALLOWED_ORIGINS.includes(returnTo)) {
        return error(400, "BAD_REQUEST", "returnTo is not an allowed site");
      }
      const backToSite = (hash: URLSearchParams) =>
        redirect(`${returnTo}/auth/callback#${hash}`);
      const failed = (reason: string) =>
        backToSite(new URLSearchParams({ error: reason }));

      if (!params.ticket) return failed("login_failed");

      // ESN'e girişte kullanılan service adresinin aynısını gönderiyoruz.
      const service = new URL(
        `https://${event.requestContext.domainName}/auth/callback`,
      );
      service.searchParams.set("returnTo", returnTo);

      let casUser: Awaited<ReturnType<typeof validateTicket>>;
      try {
        casUser = await validateTicket(params.ticket, service.toString());
      } catch (err) {
        console.error(
          JSON.stringify({
            msg: "CAS unreachable",
            error: err instanceof Error ? err.message : String(err),
          }),
        );
        return failed("esn_unavailable");
      }
      if (!casUser) {
        console.warn(JSON.stringify({ msg: "CAS ticket rejected" }));
        return failed("login_failed");
      }

      const user = await upsertUser({
        userId: casUser.userId,
        name:
          `${casUser.firstName} ${casUser.lastName}`.trim() || casUser.userId,
        section: casUser.section,
      });
      const { token, expiresAt } = await issueToken({
        userId: user.userId,
        role: user.role,
        name: user.name,
        section: user.section,
        authTime: nowSeconds(),
      });
      console.log(
        JSON.stringify({ msg: "login", userId: user.userId, role: user.role }),
      );
      return backToSite(
        new URLSearchParams({ token, expiresAt: String(expiresAt) }),
      );
    }

    case "POST /auth/refresh": {
      // Authorizer token'ı zaten doğruladı; auth_time için tekrar okuyoruz.
      const claims = await verifyToken(
        bearerToken(event.headers.authorization),
      );
      if (!claims) return error(401, "UNAUTHORIZED", "Invalid token");
      if (nowSeconds() - claims.authTime > SESSION_MAX_SECONDS) {
        return error(401, "UNAUTHORIZED", "Session expired, log in again");
      }

      // Rol değişmiş olabilir: tablodan yeniden okunur.
      const user = await findUser(claims.userId);
      if (!user) return error(401, "UNAUTHORIZED", "User not found");

      const { token, expiresAt } = await issueToken({
        userId: user.userId,
        role: user.role,
        name: user.name,
        section: user.section,
        authTime: claims.authTime,
      });
      return json(200, { token, expiresAt });
    }

    case "GET /auth/me": {
      const userId = getUser(event)?.userId;
      const user = userId ? await findUser(userId) : undefined;
      if (!user) return error(404, "NOT_FOUND", "User not found");
      return json(200, {
        userId: user.userId,
        name: user.name,
        section: user.section,
        role: user.role,
      });
    }

    default:
      return notImplemented(event);
  }
});
