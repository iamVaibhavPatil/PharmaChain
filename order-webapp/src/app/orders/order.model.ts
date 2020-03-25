export class Order {
    public orderId: string;
    public customerId: string;
    public totalItems: string;
    public orderItems: OrderItem[];
    public orderIssueDate: string;
    public orderAmount: number;
    public discount: number;
    public totalTax: number;
    public shippingCharge: number;
    public netPayoutAmount: number;
    public orderStatus: string;
    constructor() {}
}

export class OrderItem {
    public productId: string;
    public productName: string;
    public price: number;
    public quantity: number;
    public total: number;
    constructor() {}
}
