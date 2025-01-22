export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export interface PaginationParams {
    page: number;
    pageSize: number;
    filters?: Record<string, any>;
    sortBy?: string;
    sortOrder?: SortOrder.ASC | SortOrder.DESC;
}

export interface PaginationResponse<T> {
    data: T[];
    total: number;
}
