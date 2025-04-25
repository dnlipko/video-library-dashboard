# Use Node.js LTS version
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Bundle app source
COPY . .

# Expose port
EXPOSE 5173

# Command to run the application
CMD ["yarn", "dev", "--host"] 