import {RegexPatterns} from "@shared/contants/RegexPatterns";

export const Validator = {
    isEmail: (email: string): boolean => {
        return RegexPatterns.EMAIL.test(email);
    },

    isPhoneNumber: (phoneNumber: string): boolean => {
        return RegexPatterns.PHONE.test(phoneNumber);
    },

    isLatitude: (latitude: string): boolean => {
        return RegexPatterns.LATITUDE.test(latitude);
    },

    isLongitude: (longitude: string): boolean => {
        return RegexPatterns.LONGITUDE.test(longitude);
    }
};
