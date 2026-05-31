FROM oven/bun:latest

WORKDIR /app

# Copy package files and lockfile
COPY package.json bun.lock ./

# Install dependencies using Bun
RUN bun install

# Copy project files
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Start development server with host option to allow access from external networks
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
