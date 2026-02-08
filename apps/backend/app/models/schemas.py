from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum


class ErrorCode(str, Enum):
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
    BAD_REQUEST = "BAD_REQUEST"
    UNAUTHORIZED = "UNAUTHORIZED"
    FORBIDDEN = "FORBIDDEN"
    NOT_FOUND = "NOT_FOUND"
    TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS"
    UNAVAILABLE_FOR_LEGAL_REASONS = "UNAVAILABLE_FOR_LEGAL_REASONS"
    PRECONDITION_REQUIRED = "PRECONDITION_REQUIRED"
    REQUEST_ENTITY_TOO_LARGE = "REQUEST_ENTITY_TOO_LARGE"
    REQUEST_HEADER_FIELDS_TOO_LARGE = "REQUEST_HEADER_FIELDS_TOO_LARGE"
    REQUEST_URI_TOO_LONG = "REQUEST_URI_TOO_LONG"
    UNSUPPORTED_MEDIA_TYPE = "UNSUPPORTED_MEDIA_TYPE"
    REQUESTED_RANGE_NOT_SATISFIABLE = "REQUESTED_RANGE_NOT_SATISFIABLE"
    EXPECTATION_FAILED = "EXPECTATION_FAILED"


class APIResponse(BaseModel):
    status: str = Field(..., description="Response status: success or error")
    message: str = Field(..., description="Response message")
    data: Optional[Dict[str, Any]] = Field(
        None, description="Response data"
    )
    error_code: Optional[ErrorCode] = Field(
        None, description="Error code if status is error"
    )


class DestinationResponse(BaseModel):
    id: int
    name: str
    image: str
    desc: str
    created_at: datetime
