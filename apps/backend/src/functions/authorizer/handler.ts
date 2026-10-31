import type { APIGatewaySimpleAuthorizerResult } from "aws-lambda";

/**
 * Korumalı her istekte API Gateway önce bunu çağırır.
 * 1.5 iskeleti: herkesi reddeder. Gerçek token kontrolü 2.1'de (ESN Galaxy girişi).
 *
 * - Authorization başlığı yoksa API Gateway bunu hiç çağırmadan 401 döner.
 * - Başlık varsa buraya gelir, isAuthorized: false olduğu için 403 döner.
 */
export const handler = async (): Promise<APIGatewaySimpleAuthorizerResult> => {
    return { isAuthorized: false };
};
