import {
  type ApiEvent,
  error,
  getUser,
  json,
  notImplemented,
  parseJson,
  withErrors,
} from "../../lib/http";
import { createUpload, isImageType } from "../../lib/media";

/** cityId / guideId: küçük harf, rakam, tire (ör. "istanbul", "sim-card"). */
const SLUG = /^[a-z0-9-]{1,64}$/;

/**
 * AdminService: bu fonksiyondaki her işlem sadece admin'e açık.
 * Rol kontrolü iş mantığından önce yapılır.
 */
export const handler = withErrors(async (event: ApiEvent) => {
  if (getUser(event)?.role !== "admin") {
    return error(403, "FORBIDDEN", "Admin role required");
  }

  switch (event.routeKey) {
    case "POST /admin/uploads": {
      // 1.7: şehir kapak ve rehber görselleri için imzalı yükleme izni.
      const body = parseJson(event);
      const { target, id, contentType } = body ?? {};

      if (target !== "city" && target !== "guide") {
        return error(400, "BAD_REQUEST", 'target must be "city" or "guide"');
      }
      if (typeof id !== "string" || !SLUG.test(id)) {
        return error(400, "BAD_REQUEST", "id must be a slug like istanbul");
      }
      if (!isImageType(contentType)) {
        return error(
          400,
          "BAD_REQUEST",
          "contentType must be image/jpeg, image/png or image/webp",
        );
      }

      const folder = target === "city" ? `cities/${id}` : `guides/${id}`;
      return json(200, await createUpload(folder, contentType));
    }

    default:
      return notImplemented(event);
  }
});
