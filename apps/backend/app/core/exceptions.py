import logging
from typing import Optional, Dict, Any

class AppError(Exception):
    """Base application error with HTTP status and machine error code."""
    def __init__(self, message: str, *, status_code: int = 400, error_code: Optional[str] = None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.error_code = error_code

    def to_error_payload(self) -> Dict[str, Any]:
        """Standardized error payload for API responses."""
        return {
            "status": "error",
            "message": self.message,
            "data": None,
            "error_code": self.error_code,
        }


def to_http_exception(exc: AppError):
    """Convert an AppError into FastAPI HTTPException with standardized payload."""
    try:
        from fastapi import HTTPException
        return HTTPException(status_code=exc.status_code, detail=exc.to_error_payload())
    except Exception as e:
        # Fallback generic 500
        from fastapi import HTTPException
        return HTTPException(status_code=500, detail={
            "status": "error",
            "message": "Internal server error",
            "data": None,
            "error_code": None,
        })