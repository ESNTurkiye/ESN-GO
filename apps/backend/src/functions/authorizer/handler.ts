import type {
  APIGatewayRequestAuthorizerEventV2,
  APIGatewaySimpleAuthorizerWithContextResult,
} from "aws-lambda";
import type { AuthContext } from "../../lib/http";
import { bearerToken, verifyToken } from "../../lib/jwt";

type AuthorizerResult = APIGatewaySimpleAuthorizerWithContextResult<
  AuthContext | Record<string, never>
>;

/**
 * Korumalı her istekte API Gateway önce bunu çağırır (sonuç 300 sn önbellekte).
 * - Authorization başlığı yoksa API Gateway bunu hiç çağırmadan 401 döner.
 * - Token geçersiz veya süresi dolmuşsa isAuthorized: false → 403.
 * - Geçerliyse kullanıcı kimliği ve rolü isteğe eklenir (getUser ile okunur).
 */
export const handler = async (
  event: APIGatewayRequestAuthorizerEventV2,
): Promise<AuthorizerResult> => {
  const claims = await verifyToken(bearerToken(event.headers?.authorization));
  if (!claims) return { isAuthorized: false, context: {} };
  return {
    isAuthorized: true,
    context: { userId: claims.userId, role: claims.role },
  };
};
