import { isCityId } from "../../lib/cities";
import { getPlace, isInTurkey, suggestPlaces } from "../../lib/geo";
import { findGuide, isGuideId, listGuides } from "../../lib/guides";
import { type ApiEvent, error, json, noContent, notImplemented, parseJson, requireUser, withErrors } from "../../lib/http";
import { createUpload, isImageType } from "../../lib/media";
import {
    canEdit,
    createPlace,
    deletePlace,
    findPlace,
    isPlaceId,
    listAuthorPlaces,
    listCityPlaces,
    listPublishedPlaces,
    parseLimit,
    parsePlaceInput,
    toPublicPlace,
    updatePlace,
} from "../../lib/places";

/**
 * ContentService: şehirler, mekanlar, rehberler, görsel yükleme.
 * Bütün rotaları tek Lambda karşılıyor, event.routeKey ile ayrılıyor.
 */
export const handler = withErrors(async (event: ApiEvent) => {
    const params = event.pathParameters ?? {};
    const query = event.queryStringParameters ?? {};

    switch (event.routeKey) {
        case "GET /cities":
            // 1.5: iskelet testi. Gerçek şehir listesi 3.4'te gelecek.
            return json(200, {
                message: "Hello from ESN GO (Hakkı test)",
                stage: process.env.STAGE,
                time: new Date().toISOString(),
            });

        // --- Mekanlar (3.2) ----------------------------------------------------

        case "GET /places": {
            // Tüm şehirler, en yeni önce: Explore "Tümü", ana sayfa "New from local ESNers".
            const places = await listPublishedPlaces(parseLimit(query.limit));
            return json(200, { places: places.map(toPublicPlace) });
        }

        case "GET /cities/{cityId}/places": {
            // Bir şehrin yayındaki mekanları, en yeni önce.
            if (!isCityId(params.cityId)) {
                return error(404, "NOT_FOUND", "City not found");
            }
            const places = await listCityPlaces(params.cityId, parseLimit(query.limit));
            return json(200, { places: places.map(toPublicPlace) });
        }

        case "GET /places/{placeId}": {
            // Mekan detayı. Gizli mekan ziyaretçiye yokmuş gibi görünür.
            const place = isPlaceId(params.placeId) ? await findPlace(params.placeId) : undefined;
            if (!place || place.status !== "published") {
                return error(404, "NOT_FOUND", "Place not found");
            }
            return json(200, toPublicPlace(place));
        }

        case "GET /me/places": {
            // ESNer'ın kendi mekanları, gizlenenler dahil (status alanıyla).
            const user = requireUser(event);
            const places = await listAuthorPlaces(user.userId);
            return json(200, { places: places.map(toPublicPlace) });
        }

        case "POST /places": {
            // Yeni mekan: ön onay yok, hemen yayında.
            const user = requireUser(event);
            const input = parsePlaceInput(parseJson(event), user.userId);
            const place = await createPlace(input, user);
            return json(201, toPublicPlace(place));
        }

        case "PUT /places/{placeId}": {
            // ESNer sadece kendi mekanını, admin hepsini düzenler.
            const user = requireUser(event);
            const existing = isPlaceId(params.placeId) ? await findPlace(params.placeId) : undefined;
            if (!existing) return error(404, "NOT_FOUND", "Place not found");
            if (!canEdit(user, existing)) {
                return error(403, "FORBIDDEN", "You can only edit your own places");
            }
            // Fotoğraflar mekan sahibinin klasöründen olmalı (admin düzenlese de).
            const input = parsePlaceInput(parseJson(event), existing.authorId);
            const place = await updatePlace(existing, input);
            return json(200, toPublicPlace(place));
        }

        case "DELETE /places/{placeId}": {
            // ESNer sadece kendi mekanını, admin hepsini siler. Fotoğraflar S3'te kalır.
            const user = requireUser(event);
            const existing = isPlaceId(params.placeId) ? await findPlace(params.placeId) : undefined;
            if (!existing) return error(404, "NOT_FOUND", "Place not found");
            if (!canEdit(user, existing)) {
                return error(403, "FORBIDDEN", "You can only delete your own places");
            }
            if (!(await deletePlace(existing.placeId))) {
                return error(404, "NOT_FOUND", "Place not found");
            }
            return noContent();
        }

        // --- Görsel yükleme (1.7) ----------------------------------------------

        case "POST /uploads": {
            // ESNer mekan fotoğrafı için imzalı yükleme izni alır.
            const user = requireUser(event);

            const contentType = parseJson(event)?.contentType;
            if (!isImageType(contentType)) {
                return error(400, "BAD_REQUEST", "contentType must be image/jpeg, image/png or image/webp");
            }

            const folder = `uploads/${encodeURIComponent(user.userId)}`;
            return json(200, await createUpload(folder, contentType));
        }

        // --- Konum arama (1.8) -------------------------------------------------

        case "GET /geo/suggest": {
            // ESNer mekan adını yazarken öneriler.
            requireUser(event);

            const q = query.q?.trim() ?? "";
            const lat = Number(query.lat);
            const lng = Number(query.lng);

            if (q.length < 3 || q.length > 100) {
                return error(400, "BAD_REQUEST", "q must be 3-100 characters");
            }
            if (!isInTurkey(lat, lng)) {
                return error(400, "BAD_REQUEST", "lat/lng must be a point in Türkiye");
            }

            return json(200, { results: await suggestPlaces(q, { lat, lng }) });
        }

        case "GET /geo/place": {
            // Seçilen önerinin kaydedilebilir konumu (+ semt).
            requireUser(event);

            const id = query.id;
            if (!id || id.length > 500) {
                return error(400, "BAD_REQUEST", "id is required");
            }

            const place = await getPlace(id);
            if (!place) return error(404, "NOT_FOUND", "Place not found");
            return json(200, place);
        }

        // --- Rehberler (3.2 okuma; içerik 3.6) ---------------------------------

        case "GET /guides":
            return json(200, { guides: await listGuides() });

        case "GET /guides/{guideId}": {
            const guide = isGuideId(params.guideId) ? await findGuide(params.guideId) : undefined;
            if (!guide) return error(404, "NOT_FOUND", "Guide not found");
            return json(200, guide);
        }

        default:
            return notImplemented(event);
    }
});
