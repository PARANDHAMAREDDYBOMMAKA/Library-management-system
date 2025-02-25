# Use Node.js Alpine as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files first (this speeds up builds using Docker caching)
COPY package.json package-lock.json ./

# Copy the prisma directory before installing dependencies
COPY prisma prisma

# Install dependencies
RUN npm install

# Copy the remaining project files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the Next.js default port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
