export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[0-9]{1,3}[0-9]{3,14}$/;

// Check if value is empty (null, undefined, empty string, empty array, empty object)
export const isEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

// Check if value is a valid email
export const isEmail = (value: string): boolean => {
    return emailRegex.test(value);
}

// Check if value is a valid URL
export const isUrl = (value: string): boolean => {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol);
    } catch {
        return false;
    }
}

// Check if value is a valid phone number (with optional country code)
export const isPhoneNumber = (value: string): boolean => {
    return phoneRegex.test(value);
}

// Check if value is a strong password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
export const isStrongPassword = (value: string): boolean => {
    return passwordRegex.test(value);
}
