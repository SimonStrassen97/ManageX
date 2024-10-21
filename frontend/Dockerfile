# Frontend Dockerfile
FROM node:14

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose port 3000 for React app
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
