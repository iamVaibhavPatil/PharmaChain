export class Auth {
    public storeUser: StoreUser;
    public jwtToken: string;
    constructor() {}
}

class StoreUser {
    public storeId?: string;
    public userName: string;
    public password: string;
    public status?: string;
    public roles?: string[];
    constructor() {}
}
