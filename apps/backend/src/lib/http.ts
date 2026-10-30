import type {
  APIGatewayProxyEventV2WithLambdaAuthorizer,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";

/** Kullanıcı rolleri (MVP). */
export type Role = "esner" | "admin";

/** Authorizer'ın isteğe eklediği kullanıcı bilgisi. */
export interface AuthContext {
  userId: string;
  role: Role;
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

/** Henüz yazılmamış rotalar için 501. İlgili task'ta doldurulacak. */
export function notImplemented(event: ApiEvent): ApiResult {
  return error(
    501,
    "NOT_IMPLEMENTED",
    `${event.routeKey} is not implemented yet`,
  );
}

/** İsteği yapan kullanıcı. Açık rotalarda undefined döner. */
export function getUser(event: ApiEvent): AuthContext | undefined {
  return event.requestContext.authorizer?.lambda;
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
