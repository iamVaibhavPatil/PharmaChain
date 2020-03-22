export class Product {
    public productId: string;
    public productName: string;
    public productDescription: string;
    public companyName: string;
    public category: string;
    public packing: string;
    public strength: string;
    public price: number;
    public isOTCApproved: string;
    public ingredients: Ingredient[];
    constructor() {}
}

class Ingredient {
    public name: string;
    public quantity: string;
    constructor() {}
}
