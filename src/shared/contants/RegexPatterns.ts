export const RegexPatterns = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,  // Mínimo 8 caracteres, al menos una letra y un número
    PHONE: /^\+?[1-9]\d{1,14}$/, // E.164 format
    LATITUDE: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/,
    LONGITUDE: /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)$/
};
