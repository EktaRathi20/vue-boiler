import moment from 'moment';

export const dateUtils = {
    // Format a date string or Date object to a specific format
    format: (date: string | Date, formatString: string = 'YYYY-MM-DD'): string => {
        try {
            const dateObj = typeof date === 'string' ? moment(date) : moment(date);
            if (!dateObj.isValid()) return 'Invalid Date';
            return dateObj.format(formatString);
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    },

    // Get relative time from now (e.g., "2 hours ago", "in 3 days")
    fromNow: (date: string | Date): string => {
        try {
            const dateObj = typeof date === 'string' ? moment(date) : moment(date);
            if (!dateObj.isValid()) return 'Invalid Date';
            return dateObj.fromNow();
        } catch (error) {
            console.error('Error calculating relative time:', error);
            return 'Invalid Date';
        }
    },

    // Check if a date is valid
    isValid: (date: string | Date): boolean => {
        try {
            const dateObj = typeof date === 'string' ? moment(date) : moment(date);
            return dateObj.isValid();
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    // Get start of day
    startOfDay: (date: Date = new Date()): Date => {
        return moment(date).startOf('day').toDate();
    },

    // Get end of day
    endOfDay: (date: Date = new Date()): Date => {
        return moment(date).endOf('day').toDate();
    },

    // Format a duration in milliseconds to human readable format
    formatDuration: (milliseconds: number): string => {
        const duration = moment.duration(milliseconds);
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        if (minutes > 0) return `${minutes}m ${seconds}s`;
        return `${seconds}s`;
    },

    // Get the current date and time in the specified format (e.g., "2025-01-06 14:30:00")
    getCurrentDateTime: (): string => {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },

    // Convert a date string to a human-readable format (e.g., "January 6, 2025")
    formatToHumanReadable: (date: string | Date): string => {
        return moment(date).format('MMMM D, YYYY');
    },

    // Get the difference between two dates in days
    getDaysDifference: (startDate: string | Date, endDate: string | Date): number => {
        return moment(endDate).diff(moment(startDate), 'days');
    },

    // Add days to a specific date
    addDays: (date: string | Date, days: number): string => {
        return moment(date).add(days, 'days').format('YYYY-MM-DD');
    },

    // Subtract days from a specific date
    subtractDays: (date: string | Date, days: number): string => {
        return moment(date).subtract(days, 'days').format('YYYY-MM-DD');
    },

    // Check if a date is within a given range
    isDateInRange: (
        date: string | Date,
        startDate: string | Date,
        endDate: string | Date,
    ): boolean => {
        return moment(date).isBetween(startDate, endDate, 'days', '[]');
    },

    // Get the weekday of a given date (e.g., "Monday", "Tuesday")
    getWeekday: (date: string | Date): string => {
        return moment(date).format('dddd');
    },
};
