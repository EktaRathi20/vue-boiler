// Deep clone an object
export const deepClone = (obj: {}) => {
    return JSON.parse(JSON.stringify(obj));
}

//Merge multiple objects into one
export const merge = (...objects: object[]): object => {
    return Object.assign({}, ...objects);
}

// Omit specific keys from an object
export const omit = (obj: Record<string, any>, keys: string[]): Record<string, any> => {
    const result = { ...obj };
    keys.forEach((key) => {
        delete result[key];
    });
    return result;
}

//Check if two objects are deeply equal
export const isEqual = (obj1: object, obj2: object): boolean => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
