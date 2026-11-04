import { XMLParser } from "fast-xml-parser";

/** ESN Accounts CAS sunucusu (1.1 kararı). */
export const CAS_URL = "https://accounts.esn.org/cas";

export interface CasUser {
  /** ESN Accounts kullanıcı adı, küçük harfle. users tablosunda userId. */
  userId: string;
  firstName: string;
  lastName: string;
  section?: string;
  country?: string;
}

const parser = new XMLParser({
  removeNSPrefix: true, // "cas:user" → "user"
  parseTagValue: false, // her şey metin kalsın (ör. sayısal kullanıcı adı)
  htmlEntities: true, // "&#287;" gibi karakter kodlarını çöz (ğ)
});

const text = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;

/**
 * Ticket'ı ESN'e doğrulatır (CAS serviceValidate).
 * `service`, girişte kullanılan adresle birebir aynı olmalı.
 * Ticket geçersizse undefined; ESN'e ulaşılamazsa hata fırlatır.
 */
export async function validateTicket(
  ticket: string,
  service: string,
): Promise<CasUser | undefined> {
  const url = `${CAS_URL}/serviceValidate?${new URLSearchParams({ service, ticket })}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`CAS responded with ${res.status}`);

  const success = parser.parse(await res.text())?.serviceResponse
    ?.authenticationSuccess;
  const userId = text(success?.user)?.toLowerCase();
  if (!userId) return undefined;

  const attributes = success.attributes ?? {};
  return {
    userId,
    firstName: text(attributes.first) ?? "",
    lastName: text(attributes.last) ?? "",
    section: text(attributes.section),
    country: text(attributes.country),
  };
}
