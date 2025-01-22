export const encodeData = (data: string): string => {
    return btoa(data);
};

export const decodeData = (encodedData: string): string => {
    return atob(encodedData);
};