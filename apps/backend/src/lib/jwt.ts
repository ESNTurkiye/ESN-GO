import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { jwtVerify, SignJWT } from "jose";
import { isRole, type Role } from "./http";

const ssm = new SSMClient({});

const ISSUER = `esngo-${process.env.STAGE}`;
const AUDIENCE = "esngo";

/** Token 1 gün geçerli. */
export const TOKEN_TTL_SECONDS = 24 * 60 * 60;
/** İlk girişten 30 gün sonra refresh reddedilir, yeniden ESN girişi gerekir. */
export const SESSION_MAX_SECONDS = 30 * 24 * 60 * 60;

export interface TokenClaims {
  userId: string;
  role: Role;
  name: string;
  section?: string;
  /** İlk ESN girişinin zamanı (saniye). Refresh'te değişmez. */
  authTime: number;
}

/** İmza anahtarı SSM'den bir kez okunur, Lambda açık kaldıkça bellekte tutulur. */
let secretPromise: Promise<Uint8Array> | undefined;

function getSecret(): Promise<Uint8Array> {
  secretPromise ??= ssm
    .send(
      new GetParameterCommand({
        Name: process.env.JWT_SECRET_PARAM,
        WithDecryption: true,
      }),
    )
    .then((res) => {
      const value = res.Parameter?.Value;
      if (!value) throw new Error("JWT secret is empty");
      return new TextEncoder().encode(value);
    })
    .catch((err) => {
      secretPromise = undefined; // bir sonraki istekte tekrar dene
      throw err;
    });
  return secretPromise;
}

export const nowSeconds = (): number => Math.floor(Date.now() / 1000);

export async function issueToken(
  claims: TokenClaims,
): Promise<{ token: string; expiresAt: number }> {
  const now = nowSeconds();
  const expiresAt = now + TOKEN_TTL_SECONDS;
  const token = await new SignJWT({
    role: claims.role,
    name: claims.name,
    section: claims.section,
    auth_time: claims.authTime,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(claims.userId)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt(now)
    .setExpirationTime(expiresAt)
    .sign(await getSecret());
  return { token, expiresAt };
}

/** Token geçerliyse içindeki bilgileri, değilse undefined döner. */
export async function verifyToken(
  token: string | undefined,
): Promise<TokenClaims | undefined> {
  if (!token) return undefined;
  const secret = await getSecret(); // SSM hatası 500 olsun, "geçersiz token" değil
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ["HS256"],
    });
    const { sub, role, name, section, auth_time } = payload;
    if (!sub || !isRole(role)) return undefined;
    if (typeof auth_time !== "number") return undefined;
    return {
      userId: sub,
      role,
      name: typeof name === "string" ? name : "",
      section: typeof section === "string" ? section : undefined,
      authTime: auth_time,
    };
  } catch {
    return undefined;
  }
}

/** "Authorization: Bearer <token>" başlığından token'ı alır. */
export function bearerToken(header: string | undefined): string | undefined {
  return header?.match(/^Bearer\s+(\S+)$/i)?.[1];
}
