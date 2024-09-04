export class Address {
    private readonly street: string;
    private readonly city: string;
    private readonly postalCode: string;

    constructor(street: string, city: string, postalCode: string) {
        this.validate(street, city, postalCode);
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
    }

    private validate(street: string, city: string, postalCode: string): void {
        if (!street || !city || !postalCode) {
            throw new Error('All address fields must be provided');
        }
    }

    public getFullAddress(): string {
        return `${this.street}, ${this.city}, ${this.postalCode}`;
    }

    public equals(other: Address): boolean {
        return (
            this.street === other.street &&
            this.city === other.city &&
            this.postalCode === other.postalCode
        );
    }
}
