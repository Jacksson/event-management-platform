import { BaseEntity } from './BaseEntity';

export class User extends BaseEntity {
    name: string;
    email: string;
    passwordHash: string;
    role: 'user' | 'admin';

    constructor(name: string, email: string, passwordHash: string, role: 'user' | 'admin' = 'user') {
        super();
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    updateUserDetails(name: string, email: string): void {
        this.name = name;
        this.email = email;
        this.updateTimestamp();
    }

    changePassword(newPasswordHash: string): void {
        this.passwordHash = newPasswordHash;
        this.updateTimestamp();
    }
}
