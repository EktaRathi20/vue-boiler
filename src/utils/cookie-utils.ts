import { encodeData, decodeData } from './encode-decode-utils';

export const setEncodedCookie = (name: string, value: string, days: number): void => {
    const encodedValue = encodeData(value);
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodedValue};${expires};path=/`;
};

export const getDecodedCookie = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return decodeData(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
};

export const eraseCookie = (name: string): void => {
    document.cookie = `${name}=; Max-Age=-99999999;`;
};