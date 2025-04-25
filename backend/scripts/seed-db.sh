#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Run migrations
echo "Running database migrations..."
docker exec video-library-api yarn prisma:migrate

# Run seeds
echo "Seeding database..."
docker exec video-library-api yarn prisma:seed

echo "Database setup completed!" 