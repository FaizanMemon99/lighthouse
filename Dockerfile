# Stage 1: Build the React app
FROM node:21-alpine3.18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:1.25.3-alpine as production

# Copy the build output to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
