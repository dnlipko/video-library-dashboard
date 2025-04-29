import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../prisma/client';

// Validation schemas
export const tagQuerySchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(['name', 'created_at']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Get all tags with filtering
export const getTags = async (_req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany();
    
    res.json(tags);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid query parameters', details: error.errors });
    } else {
      console.error('Error fetching tags:', error);
      res.status(500).json({ error: 'Failed to fetch tags' });
    }
  }
};
