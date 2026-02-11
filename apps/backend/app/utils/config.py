import os
from dotenv import load_dotenv

load_dotenv()
load_dotenv(".env.local")


class Settings:
    """Application settings from environment variables"""

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # Server
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")

    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    # CORS
    ALLOWED_ORIGINS: list = os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")

    # API
    API_TITLE: str = os.getenv("API_TITLE", "ESN GO API")
    API_DESCRIPTION: str = os.getenv(
        "API_DESCRIPTION", "ESN GO API Description"
    )
    API_VERSION: str = os.getenv("API_VERSION", "1.0.0")

    ENABLE_CACHE: bool = os.getenv("ENABLE_CACHE", "false").lower() == "true"
    SEO_VERSION: str = os.getenv("SEO_VERSION", "1")

    @classmethod
    def validate(cls) -> None:
        """Validate required settings (database not integrated yet)."""
        pass


settings = Settings()
