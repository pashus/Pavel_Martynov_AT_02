import { IApiProvider, IOrder, IOrderData, IProduct } from "../../types";
import { EventEmitter } from "../base/events";

export class OrderModel implements IOrder{
    private items: IProduct[];
    private totalPrice: number;
    private paymentMethod: string;
    private deliveryAddress: string;
    private email: string;
    private phone: string;
    private api: IApiProvider;
    private eventEmitter: EventEmitter;

    constructor(api: IApiProvider, eventEmitter: EventEmitter) {
        this.api = api;
        this.eventEmitter = eventEmitter;
    }

    setOrderData(data: IOrderData): void {

    }

    sendOrder(): Promise<void> {
        const orderData = {
            items: this.items.map(product => product.id),
            total: this.totalPrice,
            payment: this.paymentMethod,
            address: this.deliveryAddress,
            email: this.email,
            phone: this.phone
        };
        
        return this.api.post('/api/weblarek/order', orderData);
    }
}