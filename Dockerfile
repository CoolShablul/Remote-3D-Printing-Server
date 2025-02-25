# frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# backend
FROM node:18-alpine AS backend-build

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

COPY --from=frontend-build /app/frontend/build ./public

RUN npm run build

# image
FROM node:18-alpine

WORKDIR /app

COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules

# env vars
ENV NODE_ENV=production
ENV PORT=4000

# Expose the backend port
EXPOSE 4000

# Start the backend server
CMD ["node", "./backend/dist/routes/index.ts"]
