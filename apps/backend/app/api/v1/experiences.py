from fastapi import APIRouter, HTTPException, Depends, Query
from typing import Optional

from ...models.schemas import APIResponse
from ...services.esn_service import ESNService, get_esn_service
from ...core.exceptions import AppError, to_http_exception

router = APIRouter(prefix="/experiences", tags=["experiences"])


@router.get("", response_model=APIResponse)
@router.get("/", response_model=APIResponse)
async def get_experiences(
    minLat: float = Query(..., description="Minimum latitude for bounding box"),
    maxLat: float = Query(..., description="Maximum latitude for bounding box"),
    minLng: float = Query(..., description="Minimum longitude for bounding box"),
    maxLng: float = Query(..., description="Maximum longitude for bounding box"),
    category: str = Query(..., description="Experience category: vibe, food, or hidden"),
    vibe: Optional[str] = Query(None, description="Optional vibe filter (e.g., nightlife, culture, relaxation, nature)"),
    service: ESNService = Depends(get_esn_service)
):
    """Get experiences by bounding box, category, and optional vibe filter."""
    try:
        # Validate inputs
        if not category or category not in ["vibe", "food", "hidden"]:
            raise HTTPException(
                status_code=400,
                detail={
                    "status": "error",
                    "message": "Invalid category. Must be one of: vibe, food, hidden",
                    "data": None,
                    "error_code": "BAD_REQUEST"
                }
            )
        
        # For now, return mock data filtered by category and optional vibe
        # In production, this would query a database with the bounding box coordinates
        
        # Mock experience items - in production, fetch from database
        all_experiences = [
            {
                "id": "kadikoy-nightwalk",
                "title": "Kadikoy Night Walk",
                "description": "Live music stops and student-friendly cafes around Moda.",
                "city": "Istanbul",
                "vibe": "nightlife",
                "category": "vibe",
                "budget": "low",
                "lat": 40.9865,
                "lng": 29.0263,
            },
            {
                "id": "balat-photo-route",
                "title": "Balat Color Route",
                "description": "Colorful streets, antiques and coffee breaks in Balat.",
                "city": "Istanbul",
                "vibe": "culture",
                "category": "vibe",
                "budget": "low",
                "lat": 41.0291,
                "lng": 28.9497,
            },
            {
                "id": "beyoglu-rooftop-evening",
                "title": "Beyoglu Rooftop Evening",
                "description": "Sunset rooftop spots and affordable student menus.",
                "city": "Istanbul",
                "vibe": "nightlife",
                "category": "vibe",
                "budget": "medium",
                "lat": 41.0343,
                "lng": 28.977,
            },
            {
                "id": "uskudar-coast-chill",
                "title": "Uskudar Coast Chill",
                "description": "Calm Bosphorus walk with tea stops by the coast.",
                "city": "Istanbul",
                "vibe": "relaxation",
                "category": "vibe",
                "budget": "low",
                "lat": 41.0236,
                "lng": 29.0152,
            },
            {
                "id": "istiklal-golden-hour",
                "title": "Istiklal Golden Hour Stroll",
                "description": "Street performers and historic passages before the crowds peak.",
                "city": "Istanbul",
                "vibe": "culture",
                "category": "vibe",
                "budget": "low",
                "lat": 41.0356,
                "lng": 28.979,
            },
            {
                "id": "besiktas-bosphorus-sunset",
                "title": "Besiktas Bosphorus Sunset",
                "description": "Ferry arrivals, tea gardens and student picnic spots by the water.",
                "city": "Istanbul",
                "vibe": "relaxation",
                "category": "vibe",
                "budget": "low",
                "lat": 41.0422,
                "lng": 29.0089,
            },
            {
                "id": "karakoy-after-dark",
                "title": "Karakoy After Dark",
                "description": "Converted warehouses, craft bars and Galata bridge lights.",
                "city": "Istanbul",
                "vibe": "nightlife",
                "category": "vibe",
                "budget": "medium",
                "lat": 41.0238,
                "lng": 28.9747,
            },
            {
                "id": "sirkeci-spice-bazaar",
                "title": "Sirkeci Spice Bazaar Tour",
                "description": "Turkish coffee, baklava samples and local vendors in the heart of the bazaar.",
                "city": "Istanbul",
                "vibe": "culture",
                "category": "food",
                "budget": "low",
                "lat": 41.0176,
                "lng": 28.9674,
            },
            {
                "id": "cihangir-brunch-spot",
                "title": "Cihangir Weekend Brunch",
                "description": "Artisan cafes and avocado toast meets traditional Turkish breakfast.",
                "city": "Istanbul",
                "vibe": "relaxation",
                "category": "food",
                "budget": "medium",
                "lat": 41.0375,
                "lng": 28.9595,
            },
            {
                "id": "eyup-coffee-culture",
                "title": "Eyup Coffee Culture Walk",
                "description": "Historic coffee houses and traditional Turkish tea gardens overlooking the Golden Horn.",
                "city": "Istanbul",
                "vibe": "culture",
                "category": "food",
                "budget": "low",
                "lat": 41.0598,
                "lng": 28.9483,
            },
        ]
        
        # Filter by category
        filtered = [exp for exp in all_experiences if exp["category"] == category]
        
        # Filter by vibe if provided
        if vibe and vibe.lower() != "all":
            filtered = [exp for exp in filtered if exp["vibe"].lower() == vibe.lower()]
        
        # Filter by bounding box (simple lat/lng check)
        # In production, use proper geospatial queries
        in_bounds = [
            exp for exp in filtered
            if minLat <= exp["lat"] <= maxLat and minLng <= exp["lng"] <= maxLng
        ]
        
        return APIResponse(
            status="success",
            message="Experiences fetched successfully",
            data={"experiences": in_bounds}
        )
    except AppError as e:
        raise to_http_exception(e)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": f"Failed to retrieve experiences: {str(e)}",
                "data": None,
                "error_code": "INTERNAL_SERVER_ERROR"
            }
        )
