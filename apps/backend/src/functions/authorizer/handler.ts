import type {
  APIGatewayRequestAuthorizerEventV2,
  APIGatewaySimpleAuthorizerWithContextResult,
} from "aws-lambda";
import { type AuthContext, isRole } from "../../lib/http";
import { bearerToken, verifyToken } from "../../lib/jwt";
import { findUser } from "../../lib/users";

type AuthorizerResult = APIGatewaySimpleAuthorizerWithContextResult<
  AuthContext | Record<string, never>
>;

const DENY: AuthorizerResult = { isAuthorized: false, context: {} };

/**
 * Korumalı her istekte API Gateway önce bunu çağırır (sonuç 300 sn önbellekte).
 * - Authorization başlığı yoksa API Gateway bunu hiç çağırmadan 401 döner.
 * - Token geçersiz veya süresi dolmuşsa isAuthorized: false → 403.
 * - Geçerliyse rol users tablosundan okunur ve isteğe eklenir (getUser ile okunur).
 *   Token'daki role güvenilmez: admin verildiğinde veya geri alındığında
 *   en geç önbellek süresi (300 sn) içinde etkili olur.
 * - Kullanıcı tabloda yoksa veya rolü tanınmıyorsa → 403.
 */
export const handler = async (
  event: APIGatewayRequestAuthorizerEventV2,
): Promise<AuthorizerResult> => {
  const claims = await verifyToken(bearerToken(event.headers?.authorization));
  if (!claims) return DENY;

  const user = await findUser(claims.userId);
  if (!user || !isRole(user.role)) {
    console.warn(
      JSON.stringify({
        msg: "authorizer: unknown user or role",
        userId: claims.userId,
      }),
    );
    return DENY;
  }

  return {
    isAuthorized: true,
    context: { userId: user.userId, role: user.role, name: user.name ?? "" },
  };
};
