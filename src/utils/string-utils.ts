
// Capitalize the first letter of a string and make the rest lowercase
export const capitalize = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Truncate a string to a specified length with an optional suffix(default is '...')
export const truncate = (str: string, length: number = 50, suffix: string = '...'): string => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length).trim() + suffix;
}

// Replace all occurrences of a target substring in a string with a replacement
export const replaceAll = (str: string, target: string, replacement: string): string => {
    return str.split(target).join(replacement);
}

// Check if a string contains a certain substring
export const contains = (str: string, substring: string): boolean => {
    return str.indexOf(substring) !== -1;
}

// Generate a random alphanumeric string of a specified length
export const generateRandomString = (length: number = 10): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Remove HTML tags from a string
export const stripHtmlTags = (str: string): string => {
    return str.replace(/<[^>]*>/g, '');
}