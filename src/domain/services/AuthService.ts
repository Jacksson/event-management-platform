import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import {IUserRepository} from "@domain/repositories/IUserRepository";

export class AuthService {
    private static readonly SALT_ROUNDS = 10;

    constructor(private userRepository: IUserRepository) {}

    public async register(userData: { name: string; email: string; password: string; role?: 'user' | 'admin' }): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, AuthService.SALT_ROUNDS);
        const user = new User(userData.name, userData.email, hashedPassword, userData.role || 'user');
        await this.userRepository.save(user);
        return user;
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (user && await bcrypt.compare(password, user.passwordHash)) {
            return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        }
        throw new Error('Invalid credentials');
    }
}