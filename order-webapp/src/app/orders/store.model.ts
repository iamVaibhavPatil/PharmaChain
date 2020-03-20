export class Store {
    public storeId: string;
    public storeType: string;
    public storeRegion: string;
    public storeName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public mobileNumber: string;
    public address: Address;
    public taxInfo: TaxInfo;
    public licenseInfo: LicenseInfo;
    public creditInfo: CreditInfo;
    public verified: string;
    public status: string;
    constructor() {}
}

class Address {
    public type: string;
    public addressLine1: string;
    public addressLine2?: string;
    public city: string;
    public state: string;
    public postalCode: string;
    public country: string;
    constructor() {}
}

class TaxInfo {
    public gstNumber: string;
    public panNumber: string;
    public vatNumber: string;
    constructor() {}
}

class LicenseInfo {
    public licenseNumber: string;
    public issueDate: string;
    public expiryDate: string;
    public imageUrl: string;
    constructor() {}
}

class CreditInfo {
    public creditPeriod: string;
    public discountBefore: string;
    public discountAfter: string;
    public billingAmountLimit: string;
    public orderAmountLimit: string;
    constructor() {}
}
