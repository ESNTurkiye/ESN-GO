export function getBackendUrl(): string {
    if (process.env.DOCKER_ENV === "1") {
        return process.env.BACKEND_URL || "http://esn-go-backend:8000";
    }
    return (
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        process.env.BACKEND_URL ||
        "http://localhost:8000"
    );
}
