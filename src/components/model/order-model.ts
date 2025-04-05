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
        if (data.paymentMethod) {
            this.paymentMethod = data.paymentMethod;
        }
        if (data.address) {
            this.deliveryAddress = data.address;
        }
        if (data.email) {
            this.email = data.email;
        }
        if (data.phone) {
            this.phone = data.phone;
        }
        if (data.items) {
            this.items = data.items;
        }
        if (data.totalPrice !== undefined) {
            this.totalPrice = data.totalPrice;
        }
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