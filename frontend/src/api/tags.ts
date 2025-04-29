import { Tag } from '../types/video';
import { api } from './axios';
import { AxiosError } from 'axios';

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await api.get<Tag[]>('/tags');
    
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to fetch tags: ${error.message}`);
    }
    throw error;
  }
};