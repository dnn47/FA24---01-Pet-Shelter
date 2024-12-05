# React Frontend Dockerfile (frontend/Dockerfile)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install npm dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "start"]