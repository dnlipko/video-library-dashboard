import { PrismaClient } from '@prisma/client';
import videosData from './seeds/videos.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Clear existing data
  await prisma.video.deleteMany();
  await prisma.tag.deleteMany();

  // Create videos with tags
  for (const video of videosData.videos) {
    const { tags, ...videoData } = video;
    
    await prisma.video.create({
      data: {
        ...videoData,
        created_at: new Date(videoData.created_at),
        tags: {
          connectOrCreate: tags.map((tagName: string) => ({
            where: { name: tagName },
            create: { name: tagName }
          }))
        }
      }
    });
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 