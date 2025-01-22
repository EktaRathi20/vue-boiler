// Adds all numbers in an array and returns the total sum.
export const sumArray = (numbers: number[]): number => {
    return numbers.reduce((total, num) => total + num, 0);
};

// Sorts an array of numbers in descending order.
export const sortDescending = (numbers: number[]): number[] => {
    return [...numbers].sort((a, b) => b - a); // Copy to avoid mutating the original array
};

// Sorts an array of numbers in ascending order.
export const sortAscending = (numbers: number[]): number[] => {
    return [...numbers].sort((a, b) => a - b); // Copy to avoid mutating the original array
};

// Merges two arrays into a single array.
export const mergeArrays = <T>(array1: T[], array2: T[]): T[] => {
    return [...array1, ...array2];
};

// Finds the maximum value in an array of numbers.
export const findMax = (numbers: number[]): number => {
    return Math.max(...numbers);
};

// Finds the minimum value in an array of numbers.
export const findMin = (numbers: number[]): number => {
    return Math.min(...numbers);
};

// Removes duplicate values from an array.
export const removeDuplicates = <T>(array: T[]): T[] => {
    return [...new Set(array)];
};

// Finds the difference between two arrays (elements in the first array that are not in the second).
export const arrayDifference = <T>(array1: T[], array2: T[]): T[] => {
    return array1.filter(item => !array2.includes(item));
};

// Finds the intersection of two arrays (common elements between both arrays).
export const arrayIntersection = <T>(array1: T[], array2: T[]): T[] => {
    return array1.filter(item => array2.includes(item));
};

// Calculates the average of an array of numbers.
export const calculateAverage = (numbers: number[]): number => {
    return numbers.length ? numbers.reduce((total, num) => total + num, 0) / numbers.length : 0;
};

// Splits an array into chunks of a specified size.
export const chunkArray = <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};
