FROM oven/bun:latest

USER bun
WORKDIR /app

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
