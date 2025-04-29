import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../prisma/client';

// Validation schema
export const videoQuerySchema = z.object({
  page: z.string().optional().transform((val: string | undefined) => parseInt(val || '1')),
  limit: z.string().optional().transform((val: string | undefined) => parseInt(val || '10')),
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  tags: z.string().optional().transform((val: string | undefined) => val?.split(',')),
  sortBy: z.enum(['created_at', 'title']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const getVideos = async (req: Request, res: Response) => {
  try {
    // Validate and parse query parameters
    const query = videoQuerySchema.parse(req.query);
    
    // Build where clause for filtering
    const where: any = {};
    
    if (query.search) {
      where.title = {
        contains: query.search.toLowerCase()
      };
    }
    
    if (query.startDate || query.endDate) {
      where.created_at = {};
      if (query.startDate) {
        where.created_at.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        where.created_at.lte = new Date(query.endDate);
      }
    }
    
    if (query.tags?.length) {
      where.tags = {
        some: {
          name: {
            in: query.tags.map(tag => tag.toLowerCase())
          }
        }
      };
    }
    
    // Build orderBy clause for sorting
    const orderBy: any = {};
    if (query.sortBy) {
      orderBy[query.sortBy] = query.sortOrder || 'desc';
    } else {
      orderBy.created_at = 'desc'; // Default sort by newest
    }
    
    // Execute query with pagination
    const [videos, total] = await Promise.all([
      prisma.video.findMany({
        where,
        include: {
          tags: true
        },
        orderBy,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      prisma.video.count({ where })
    ]);
    
    // Log the query parameters and results for debugging
    console.log('Query parameters:', query);
    console.log('Where clause:', where);
    console.log('Found videos:', videos.length);
    
    res.json({
      data: videos,
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit)
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid query parameters', details: error.errors });
    } else {
      console.error('Error fetching videos:', error);
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  }
}; 