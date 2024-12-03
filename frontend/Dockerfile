# React Frontend Dockerfile (frontend/Dockerfile)
FROM node:18-alpine

WORKDIR /app

# Install npm dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Serve the app with a simple HTTP server
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]

