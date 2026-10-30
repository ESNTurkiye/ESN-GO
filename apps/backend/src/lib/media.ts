import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { ulid } from "ulid";

const s3 = new S3Client({});

/** Blueprint 04: en fazla 5 MB. S3 bu sınırı imzadaki koşulla uygular. */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
/** Yükleme izni 5 dakika geçerli. */
export const UPLOAD_EXPIRES_SECONDS = 300;

/** İzin verilen dosya tipleri ve uzantıları. */
const EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export type ImageType = keyof typeof EXTENSIONS;

export function isImageType(value: unknown): value is ImageType {
  return typeof value === "string" && Object.hasOwn(EXTENSIONS, value);
}

export interface Upload {
  /** Tarayıcının dosyayı POST edeceği S3 adresi */
  url: string;
  /** Formla birlikte gönderilecek imzalı alanlar */
  fields: Record<string, string>;
  /** Dosyanın bucket'taki yolu. Mekan/şehir/rehber kaydına bu yazılır. */
  key: string;
  /** Yükleme bitince görselin açılacağı CloudFront adresi */
  cdnUrl: string;
}

/**
 * İmzalı yükleme izni üretir. Dosya adını sunucu belirler: <folder>/<ULID>.<uzantı>
 * İmza sadece bu yol, bu dosya tipi ve en fazla 5 MB için geçerlidir.
 * folder'ı çağıran fonksiyon kurar (ör. "uploads/<userId>").
 */
export async function createUpload(
  folder: string,
  contentType: ImageType,
): Promise<Upload> {
  const key = `${folder}/${ulid()}.${EXTENSIONS[contentType]}`;

  const { url, fields } = await createPresignedPost(s3, {
    Bucket: process.env.MEDIA_BUCKET ?? "",
    Key: key,
    Conditions: [
      ["content-length-range", 1, MAX_UPLOAD_BYTES],
      ["eq", "$Content-Type", contentType],
    ],
    Fields: { "Content-Type": contentType },
    Expires: UPLOAD_EXPIRES_SECONDS,
  });

  return {
    url,
    fields,
    key,
    cdnUrl: `https://${process.env.MEDIA_CDN_DOMAIN}/${key}`,
  };
}
