# Docker Setup for ESN GO

This document explains how to use Docker to containerize and run the ESN GO application.

## Prerequisites

- Docker Engine 20.10 or later
- Docker Compose 2.0 or later (optional, for using docker-compose)

## Quick Start

### Using Docker Compose (Recommended)

1. Build and start the container:
```bash
docker-compose up -d
```

2. View logs:
```bash
docker-compose logs -f
```

3. Stop the container:
```bash
docker-compose down
```

### Using Docker CLI

1. Build the image:
```bash
docker build -t esn-go:latest .
```

2. Run the container:
```bash
docker run -d -p 3000:3000 --name esn-go-app esn-go:latest
```

3. View logs:
```bash
docker logs -f esn-go-app
```

4. Stop and remove the container:
```bash
docker stop esn-go-app
docker rm esn-go-app
```

## Docker Architecture

The Dockerfile uses a multi-stage build approach with three stages:

1. **deps**: Installs Node.js dependencies
2. **builder**: Builds the Next.js application with standalone output
3. **runner**: Creates the minimal production runtime image

This approach results in a smaller, more secure production image (~150MB) compared to including all build dependencies.

## Environment Variables

You can pass environment variables to the container using:

**Docker Compose:**
```yaml
environment:
  - NODE_ENV=production
  - NEXT_TELEMETRY_DISABLED=1
  - YOUR_ENV_VAR=value
```

**Docker CLI:**
```bash
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \
  -e YOUR_ENV_VAR=value \
  esn-go:latest
```

## Port Configuration

The application runs on port 3000 by default. To use a different host port:

**Docker Compose:**
```yaml
ports:
  - "8080:3000"  # Maps host port 8080 to container port 3000
```

**Docker CLI:**
```bash
docker run -d -p 8080:3000 esn-go:latest
```

## Health Check

The container includes a health check that verifies the application is responding on port 3000. View health status:

```bash
docker inspect --format='{{.State.Health.Status}}' esn-go-app
```

## Troubleshooting

### Build Failures

If the build fails due to network issues or missing dependencies:

1. Clear Docker cache and rebuild:
```bash
docker-compose build --no-cache
```

2. Check Docker logs for specific errors:
```bash
docker-compose logs
```

### Container Won't Start

1. Check if port 3000 is already in use:
```bash
lsof -i :3000  # On Linux/macOS
netstat -an | grep 3000  # On Windows
```

2. View detailed container logs:
```bash
docker logs esn-go-app
```

### Image Size Concerns

The production image is optimized using:
- Alpine Linux base image (~5MB)
- Multi-stage builds to exclude build dependencies
- Next.js standalone output mode
- Minimal Node.js runtime

Final image size should be approximately 150-200MB.

## Production Deployment

For production deployments, consider:

1. **Environment Files**: Use `.env` files or secrets management
2. **Reverse Proxy**: Use Nginx or Traefik in front of the container
3. **SSL/TLS**: Configure HTTPS termination at the proxy level
4. **Resource Limits**: Set memory and CPU limits
5. **Monitoring**: Integrate with monitoring solutions (Prometheus, Grafana)
6. **Logging**: Configure centralized logging (ELK, Loki)

Example with resource limits:
```yaml
services:
  esn-go:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

## Development vs Production

For development, continue using:
```bash
npm run dev
```

Docker is intended for production-like environments and deployments.

## Support

For issues related to Docker setup, please create an issue on the GitHub repository.
