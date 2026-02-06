from fastapi import APIRouter
from datetime import datetime
import logging

from ..models.schemas import (
	APIResponse
)

router = APIRouter()

@router.get("/health", response_model=APIResponse)
async def health():
	"""Health check endpoint"""
	return APIResponse(
		status="success",
		message="ESN GO API is running",
		data={
			"status": "ok",
			"version": "1.0.0",
			"description": "ESN GO API Description",
			"timestamp": datetime.now().isoformat()
		},
		error_code=None
	)

@router.get("/", response_model=APIResponse)
async def root():
	"""Root endpoint with API information"""
	return APIResponse(
		status="success",
		message="ESN GO API is running",
		data={
			"name": "ESN GO API",
			"version": "1.0.0",
			"description": "ESN GO API Description"
		},
		error_code=None
	)