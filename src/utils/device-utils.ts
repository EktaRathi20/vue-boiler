// Detects if the device is a mobile device (e.g., phone).
export const isMobileDevice = (): boolean => {
    return /Mobi|Android/i.test(navigator.userAgent);
};

// Detects if the device is a tablet.
export const isTabletDevice = (): boolean => {
    return /iPad|Android.*(Mobile|Tablet)/i.test(navigator.userAgent);
};

// Detects if the device is a desktop.
export const isDesktopDevice = (): boolean => {
    return !isMobileDevice() && !isTabletDevice();
};

// Gets the screen width of the device.
export const getScreenWidth = (): number => {
    return window.innerWidth;
};

// Gets the screen height of the device.
export const getScreenHeight = (): number => {
    return window.innerHeight;
};

// Gets the device's pixel ratio.
export const getDevicePixelRatio = (): number => {
    return window.devicePixelRatio;
};

// Detects the operating system of the device.
export const getOperatingSystem = (): string => {
    const userAgent = navigator.userAgent;
    if (/Windows NT/i.test(userAgent)) return 'Windows';
    if (/Mac OS X/i.test(userAgent)) return 'MacOS';
    if (/Android/i.test(userAgent)) return 'Android';
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
    return 'Unknown';
};

// Detects if the device is using a specific browser.
export const isBrowser = (browserName: string): boolean => {
    const userAgent = navigator.userAgent;
    return userAgent.includes(browserName);
};

// Gets the available device orientation.
export const getDeviceOrientation = (): string => {
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};
