export class Auth {
    public customer: Customer;
    public jwtToken: string;
    constructor() {}
}

class Customer {
    public customerId?: string;
    public email: string;
    public password: string;
    public storeName?: string;
    public varified?: string;
    public roles?: string[];
    constructor() {}
}
