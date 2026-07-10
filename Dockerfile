FROM oven/bun:latest

# Create and chown the directory as root before switching users
RUN mkdir -p /app && chown bun:bun /app

WORKDIR /app

# Run as non-root user
USER bun

# Copy package files and lockfile
COPY --chown=bun:bun package.json bun.lock ./

# Install dependencies using Bun
RUN bun install

# Copy project files
COPY --chown=bun:bun . .

# Expose Vite dev port
EXPOSE 5173

# Start development server with host option to allow access from external networks
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
