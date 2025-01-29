# Build Stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # Ensure your build tool outputs to /app/dist (or the correct folder)

# Production Stage
FROM node:18
WORKDIR /app

# Install the dependencies for serving your app (using a simple HTTP server)
RUN npm install -g serve

# Copy the build output from the build stage
COPY --from=build /app/dist /app/dist

# Expose the port the app will run on
EXPOSE 5000

# Run the app using `serve` to serve the static files
CMD ["serve", "-s", "dist", "-l", "5000"]
