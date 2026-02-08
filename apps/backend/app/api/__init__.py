from fastapi import APIRouter
from .v1 import router as v1_router

# Main API router with /api prefix
api_router = APIRouter(prefix="/api")
api_router.include_router(v1_router)
