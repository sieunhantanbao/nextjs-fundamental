# Use Node.js LTS as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies with legacy peer deps to handle React version compatibility issues
RUN npm ci --legacy-peer-deps

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV production
ENV NEXT_PUBLIC_API_URL=http://localhost:3000

# Start the application
CMD ["npm", "start"]
