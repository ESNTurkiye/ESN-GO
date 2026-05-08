from fastapi import APIRouter
from .destinations import router as destinations_router
from .experiences import router as experiences_router

# Create the main v1 router
router = APIRouter(prefix="/v1")

# Include all v1 routers
router.include_router(destinations_router)
router.include_router(experiences_router)
