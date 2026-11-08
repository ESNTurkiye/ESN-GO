"use client";

import { ApiError, api } from "./client-api";

/**
 * Photo upload (blueprint 04): the API signs an upload for one file (POST /uploads),
 * the browser sends the file straight to S3, then the place keeps the returned key.
 * The signature allows only this path, this file type and at most 5 MB.
 */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
type PhotoType = (typeof PHOTO_TYPES)[number];

type Permit = {
  url: string;
  fields: Record<string, string>;
  key: string;
  cdnUrl: string;
};

function isPhotoType(type: string): type is PhotoType {
  return (PHOTO_TYPES as readonly string[]).includes(type);
}

function megabytes(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Why this file can't be uploaded, in words that say how to fix it (standard: Dosya tipi
 * desteklenmiyor), or null when it is fine.
 */
export function photoProblem(file: File): string | null {
  const extension = file.name.split(".").pop()?.toUpperCase() ?? "";
  if (/HEI[CF]/.test(extension) || /heic|heif/.test(file.type)) {
    return `“${file.name}” is in HEIC format. Choose a JPEG, PNG or WebP photo (on iPhone: Settings › Camera › Formats › Most Compatible).`;
  }
  if (!isPhotoType(file.type)) {
    return `“${file.name}” isn't a JPEG, PNG or WebP photo. Choose one of those.`;
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return `“${file.name}” is ${megabytes(file.size)}. Choose a photo under 5 MB, or make it smaller.`;
  }
  return null;
}

/**
 * Uploads one photo and reports progress (0–1). XMLHttpRequest, because fetch
 * can't report upload progress. Resolves with the bucket key and the CDN address.
 */
export async function uploadPhoto(
  file: File,
  onProgress: (fraction: number) => void,
  signal?: AbortSignal,
): Promise<{ key: string; url: string }> {
  if (!isPhotoType(file.type)) {
    throw new ApiError(400, "BAD_REQUEST", "Choose a JPEG, PNG or WebP photo.");
  }
  const permit = await api<Permit>("/uploads", {
    method: "POST",
    body: { contentType: file.type },
    auth: true,
  });

  const form = new FormData();
  for (const [name, value] of Object.entries(permit.fields)) {
    form.append(name, value);
  }
  form.append("file", file); // S3 needs the file last.

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", permit.url);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total);
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(
            new ApiError(
              xhr.status,
              "UPLOAD",
              "The photo didn't upload. Try again.",
            ),
          );
    xhr.onerror = () =>
      reject(
        new ApiError(
          0,
          "NETWORK",
          "The photo didn't upload: check your connection and try again.",
        ),
      );
    xhr.onabort = () => reject(new ApiError(0, "ABORTED", "Upload cancelled."));
    signal?.addEventListener("abort", () => xhr.abort());
    xhr.send(form);
  });

  onProgress(1);
  return { key: permit.key, url: permit.cdnUrl };
}
