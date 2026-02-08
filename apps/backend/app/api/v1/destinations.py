from fastapi import APIRouter, HTTPException, Depends

from ...models.schemas import APIResponse
from ...services.esn_service import ESNService, get_esn_service
from ...core.exceptions import AppError, to_http_exception
import time
import random

router = APIRouter(prefix="/destinations", tags=["destinations"])


async def _get_destinations(service: ESNService = Depends(get_esn_service)):
    """Get all destinations"""
    try:
        destinations = service.get_destinations()

        # mimic slow response
        time.sleep(random.randint(1, 3))
        return APIResponse(
            status="success",
            message="Destinations fetched successfully",
            data={"destinations": destinations}
        )
    except AppError as e:
        raise to_http_exception(e)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": "Failed to retrieve destinations",
                "data": None,
                "error_code": None
            }
        )


@router.get("/", response_model=APIResponse)
async def get_destinations_with_slash(
    service: ESNService = Depends(get_esn_service)
):
    return await _get_destinations(service)


@router.get("", response_model=APIResponse)
async def get_destinations_without_slash(
    service: ESNService = Depends(get_esn_service)
):
    return await _get_destinations(service)
