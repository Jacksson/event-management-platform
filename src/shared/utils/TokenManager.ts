import jwt, {JwtPayload} from 'jsonwebtoken';
import {Config} from "@shared/contants/Config";
//import { Config } from '../constants/Config';

export const TokenManager = {
    generateToken: (payload: object, expiresIn = Config.JWT_EXPIRATION): string => {
        return jwt.sign(payload, Config.JWT_SECRET, { expiresIn });
    },

    verifyToken: (token: string): object | string => {
        try {
            return jwt.verify(token, Config.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    },

    decodeToken: (token: string): JwtPayload | string | null => {
        return jwt.decode(token);
    }
};
