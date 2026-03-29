# Use Node base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all code
COPY . .

# Expose port
EXPOSE 6000

# Start app
CMD ["node", "server.js"]