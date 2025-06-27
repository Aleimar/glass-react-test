# Use an official Node.js image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5173
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
