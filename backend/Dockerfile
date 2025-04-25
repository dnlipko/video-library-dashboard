# Use Node.js LTS version with Alpine Linux
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Define build arguments
ARG DATABASE_URL
ARG NODE_ENV

# Set environment variables from build arguments
ENV DATABASE_URL=$DATABASE_URL
ENV NODE_ENV=$NODE_ENV

# Install app dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Bundle app source
COPY . .

# Generate Prisma Client
RUN yarn prisma:generate

# Build TypeScript
RUN yarn build

# Expose port
EXPOSE 4000

# Command to run the application
CMD ["sh", "-c", "yarn prisma:migrate && yarn prisma:seed && yarn dev"] 