import { format, parseISO } from 'date-fns';

export const DateFormatter = {
    toISO: (date: Date): string => {
        return date.toISOString();
    },

    fromISO: (isoString: string): Date => {
        return parseISO(isoString);
    },

    formatDate: (date: Date, formatString: string): string => {
        return format(date, formatString);
    },

    addDays: (date: Date, days: number): Date => {
        return new Date(date.setDate(date.getDate() + days));
    }
};
