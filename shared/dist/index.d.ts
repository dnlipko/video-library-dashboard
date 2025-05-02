export interface Video {
    id: string;
    title: string;
    thumbnail_url: string;
    created_at: Date;
    duration: number;
    views: number;
    tags: Tag[];
}
export interface Tag {
    id: string;
    name: string;
    videos?: Video[];
}
export interface ApiResponse<T> {
    data: T;
    error?: string;
}
export interface PaginationInfo {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface PaginatedResponse<T> {
    data: T;
    pagination: PaginationInfo;
}
export interface VideoQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
    tags?: string[];
    sortBy?: 'created_at' | 'title';
    sortOrder?: 'asc' | 'desc';
}
export interface VideoWhereClause {
    title?: {
        contains: string;
    };
    created_at?: {
        gte?: Date;
        lte?: Date;
    };
    tags?: {
        some: {
            name: {
                in: string[];
            };
        };
    };
}
export interface VideoOrderBy {
    [key: string]: 'asc' | 'desc';
}
