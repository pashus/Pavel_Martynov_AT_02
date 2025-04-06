export interface IProduct {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
}

export interface IOrder {
    setOrderData(data: IOrderData): void;
    sendOrder(): Promise<void>;
}

export interface IOrderData {
    address?: string;
    paymentMethod?: string;
    email?: string;
    phone?: string;
    items?: IProduct[];
    totalPrice?: number;
}

export interface ICatalog {
    fillCatalog(): Promise<void>;
    getProductById(id: string): IProduct;
    getProducts(): IProduct[];
}

export interface IBasket {
    addItem(product: IProduct): void;
    removeItem(product: IProduct): void;
    getItems(): IProduct[];
    hasItem(product: IProduct): boolean;
    getTotalPrice(): number;
    clearItems(): void;
}

export interface IView<T> {
    render(data?: T, ...args: any[]): HTMLElement;
}

export interface IApiProvider {
    get(uri: string): Promise<any>;
    post(uri: string, data: object): Promise<any>;
}