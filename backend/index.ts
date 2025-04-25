// app.js (backend entry point)
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import prisma from './prisma/client';
import { z } from 'zod';

const app = express();

// Middleware setup
app.use(express.json());        // parse JSON request bodies
app.use(cors());               // enable CORS for all origins by default (configurable)

// Validation schemas
const videoQuerySchema = z.object({
  page: z.string().optional().transform((val: string | undefined) => parseInt(val || '1')),
  limit: z.string().optional().transform((val: string | undefined) => parseInt(val || '10')),
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  tags: z.string().optional().transform((val: string | undefined) => val?.split(',')),
  sortBy: z.enum(['created_at', 'title']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Video endpoints
app.get('/videos', async (req: Request, res: Response) => {
  try {
    // Validate and parse query parameters
    const query = videoQuerySchema.parse(req.query);
    
    // Build where clause for filtering
    const where: any = {};
    
    if (query.search) {
      where.title = {
        contains: query.search,
        mode: 'insensitive'
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
            in: query.tags
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
});

// Global error handler (to handle errors uniformly)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
