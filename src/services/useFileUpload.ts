import apiService from '@/middleware/ApiClient';

const uploadFile = async (
    url: string,
    file: File,
    data?: Record<string, any>,
): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    if (data) {
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
    }

    try {
        const response = await apiService.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};


// Replace with your actual API endpoint
export const uploadFile_WITH_YOUR_API_ENDPOINT = async (
    file: File,
    additionalData?: Record<string, any>,
): Promise<any> => {
    const endpoint = 'YOUR_API_ENDPOINT_HERE';
    return await uploadFile(endpoint, file, additionalData);
};