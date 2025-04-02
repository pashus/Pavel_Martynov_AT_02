export interface IApiProvider {
    get(uri: string): Promise<any>;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
}

export interface ICatalog {
    readonly products: IProduct[];
    fillCatalog(): Promise<void>;
    getProductById(id: string): IProduct;
}

export interface IBasket {
    readonly totalPrice: number;
    addItem(product: IProduct): void; 
    removeItem(product: IProduct): void;
}

export interface IOrder {
    totalPrice: number;
    deliveryAddress: string;
    paymentMethod: string;
    phone: string;
    email: string;
}

export interface IView<T> {
    render(data?: T, ...args: any[]): HTMLElement | void;
}