import type {
  APIGatewayProxyEventV2WithLambdaAuthorizer,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";

/**
 * Kullanıcı rolleri. MVP'de iki rol var: esner (varsayılan) ve admin (elle verilir).
 * Section Manager, Region Manager gibi roller ileride buraya eklenecek.
 */
export const ROLES = ["esner", "admin"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return (
    typeof value === "string" && (ROLES as readonly string[]).includes(value)
  );
}

/** Authorizer'ın isteğe eklediği kullanıcı bilgisi. */
export interface AuthContext {
  userId: string;
  role: Role;
  /** Görünen ad (users tablosundan). Mekanın yazar adı buradan yazılır. */
  name: string;
  /** ESN şubesi (users tablosundan), yoksa "". Mekan kartındaki "Added by Name · Section". */
  section: string;
}

/**
 * HTTP API olayı. Açık rotalarda (Auth: NONE) authorizer çalışmaz,
 * bu yüzden kullanıcı bilgisi olmayabilir.
 */
export type ApiEvent = APIGatewayProxyEventV2WithLambdaAuthorizer<AuthContext>;
export type ApiResult = APIGatewayProxyStructuredResultV2;

/** Başarılı yanıt: JSON gövde. */
export function json(statusCode: number, body: unknown): ApiResult {
  return {
    statusCode,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };
}

export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "NOT_IMPLEMENTED"
  | "INTERNAL";

/** Hata yanıtı. Hepsi aynı şekilde: { "error": { "code": "...", "message": "..." } } */
export function error(
  statusCode: number,
  code: ErrorCode,
  message: string,
): ApiResult {
  return json(statusCode, { error: { code, message } });
}

/** Gövdesiz başarılı yanıt (ör. silme). */
export function noContent(): ApiResult {
  return { statusCode: 204 };
}

/** Henüz yazılmamış rotalar için 501. İlgili task'ta doldurulacak. */
export function notImplemented(event: ApiEvent): ApiResult {
  return error(
    501,
    "NOT_IMPLEMENTED",
    `${event.routeKey} is not implemented yet`,
  );
}

/**
 * Handler içinden fırlatılır, withErrors yakalayıp istemciye bu hatayı döner.
 * requireUser / requireAdmin bunu kullanır.
 */
export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: ErrorCode;

  constructor(statusCode: number, code: ErrorCode, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

/** İsteği yapan kullanıcı. Açık rotalarda undefined döner. */
export function getUser(event: ApiEvent): AuthContext | undefined {
  return event.requestContext.authorizer?.lambda;
}

/** Giriş yapmış kullanıcıyı döner. Giriş yoksa 401. */
export function requireUser(event: ApiEvent): AuthContext {
  const user = getUser(event);
  if (!user) throw new HttpError(401, "UNAUTHORIZED", "Login required");
  return user;
}

/**
 * Admin kullanıcıyı döner. Giriş yoksa 401, admin değilse 403.
 * Rol authorizer'da users tablosundan okunur, token'daki role güvenilmez.
 */
export function requireAdmin(event: ApiEvent): AuthContext {
  const user = requireUser(event);
  if (user.role !== "admin") {
    throw new HttpError(403, "FORBIDDEN", "Admin role required");
  }
  return user;
}

/**
 * Handler'ı sarar: beklenmeyen bir hata olursa loglar ve 500 döner.
 * Hatanın ayrıntısı istemciye gönderilmez, sadece loga yazılır.
 */
export function withErrors(
  fn: (event: ApiEvent) => Promise<ApiResult>,
): (event: ApiEvent) => Promise<ApiResult> {
  return async (event) => {
    try {
      return await fn(event);
    } catch (err) {
      if (err instanceof HttpError) {
        return error(err.statusCode, err.code, err.message);
      }
      console.error(
        JSON.stringify({
          msg: "unhandled error",
          route: event.routeKey,
          error: err instanceof Error ? err.message : String(err),
        }),
      );
      return error(500, "INTERNAL", "Something went wrong");
    }
  };
}
/** İstek gövdesini JSON nesnesi olarak okur. Geçersizse undefined döner. */
export function parseJson(
  event: ApiEvent,
): Record<string, unknown> | undefined {
  if (!event.body) return undefined;
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;
    const value: unknown = JSON.parse(raw);
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
}
