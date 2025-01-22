import ApiClient from "@/middleware/ApiClient";
import type { PaginationParams, PaginationResponse } from "@/models";

export async function getPaginatedData<T>(
    endpoint: string,
    params: PaginationParams
): Promise<PaginationResponse<T>> {
    const response = await ApiClient.get(endpoint, params);
    return response;
}
