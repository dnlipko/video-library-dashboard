import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const getTags = async (_req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany();
    
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
};
