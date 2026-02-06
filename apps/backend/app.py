from __future__ import annotations

import os

from flask import Flask, jsonify, request
from flask_cors import CORS

def create_app() -> Flask:
    app = Flask(__name__)

    cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    CORS(
        app,
        resources={r"/*": {"origins": [o.strip() for o in cors_origins if o.strip()]}},
    )

    @app.get("/api/destinations")
    def get_destinations():
        destinations = [
            {
                "id": 1,
                "name": "Istanbul",
                "image": "https://esnturkiye.github.io/esn-assets/images/destinations/istanbul.jpg",
                "desc": "Where East meets West in vibrant culture",
            },
            {
                "id": 2,
                "name": "Antalya",
                "image": "https://esnturkiye.github.io/esn-assets/images/destinations/antalya.jpg",
                "desc": "Mediterranean beaches and endless summer nights",
            },
            {
                "id": 3,
                "name": "Cappadocia",
                "image": "https://esnturkiye.github.io/esn-assets/images/destinations/kapadokya.jpg",
                "desc": "Fairy chimneys and hot air balloon adventures",
            },
            {
                "id": 4,
                "name": "Izmir",
                "image": "https://esnturkiye.github.io/esn-assets/images/destinations/izmir.jpg",
                "desc": "Ancient ruins meet modern coastal vibes",
            },
            {
                "id": 5,
                "name": "Ankara",
                "image": "https://esnturkiye.github.io/esn-assets/images/destinations/ankara.jpg",
                "desc": "Discover the capital's museums and vibrant student life",
            },
            {
                "id": 6,
                "name": "Bolu",
                "image": "https://esnturkiye.github.io/esn-assets/images/destinations/bolu.jpg",
                "desc": "Relax in thermal spas surrounded by nature",
            },
            {
                "id": 7,
                "name": "Denizli",
                "image": "https://esnturkiye.github.io/esn-assets/images/destinations/denizli.jpg",
                "desc": "Walk on clouds at the stunning white travertines",
            },
            {
                "id": 8,
                "name": "Ardahan",
                "image": "https://esnturkiye.github.io/esn-assets/images/destinations/ardahan.jpg",
                "desc": "Hit the slopes at Türkiye's hidden ski paradise",
            },
            {
                "id": 9,
                "name": "Bilecik",
                "image": "https://esnturkiye.github.io/esn-assets/images/destinations/bilecik.jpg",
                "desc": "Explore Ottoman heritage and historic architecture",
            },
        ]

        return jsonify({"destinations": destinations})

    @app.get("/health")
    def health():
        return jsonify({"status": "ok"})

    @app.get("/api/hello")
    def hello():
        name = request.args.get("name") or "world"
        return jsonify({"message": f"Hello, {name}!"})

    return app

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5001"))
    app.run(host="0.0.0.0", port=port, debug=True)
