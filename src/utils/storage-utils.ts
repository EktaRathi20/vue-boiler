import { encodeData, decodeData } from "./encode-decode-utils";

export const setItem = (key: string, value: any) => {
    const jsonString = JSON.stringify(value);
    const encodedValue = encodeData(jsonString);
    localStorage.setItem(key, encodedValue);
};

export const getItem = (key: string): any | null => {
    const encodedValue = localStorage.getItem(key);
    if (encodedValue) {
        const jsonString = decodeData(encodedValue);
        return JSON.parse(jsonString);
    }
    return null;
}

export const removeItem = (key: string) => {
    localStorage.removeItem(key)
}

export const clearStorage = () => {
    localStorage.clear()
}
