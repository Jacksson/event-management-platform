export class HttpError extends Error {
    public status: number;
    public details?: string;

    constructor(message: string, status: number, details?: string) {
        super(message);
        this.status = status;
        this.details = details;
    }
}