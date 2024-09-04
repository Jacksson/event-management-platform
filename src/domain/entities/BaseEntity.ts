export abstract class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.id = this.generateUUID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    private generateUUID(): string {
        // Implementa un generador de UUID o usa una librería como uuid
        return 'generated-uuid';
    }

    public updateTimestamp(): void {
        this.updatedAt = new Date();
    }
}
