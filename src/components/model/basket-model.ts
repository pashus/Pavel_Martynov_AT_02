import { IProduct, IBasket } from '../../types/index'
import { settings } from '../../utils/constants';
import { EventEmitter } from "../base/events";

export class BasketModel implements IBasket{
    private items: Map<string, IProduct> = new Map();
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter
    }
    
    addItem(product: IProduct): void {
        this.items.set(product.id, product)
        this.eventEmitter.emit(settings.updateBasket, this.getItems())
    }

    removeItem(product: IProduct): void {
        if (this.items.size === 0) return;
        this.items.delete(product.id)
        this.eventEmitter.emit(settings.updateBasket, this.getItems())
    }

    getItems(): IProduct[] {
        return Array.from(this.items.values());
    }

    hasItem(product: IProduct): boolean {
        return this.items.has(product.id);
    }
    
    get totalPrice(): number {
        return Array.from(this.items.values())
            .reduce((acc, product) => acc + product.price, 0);
    }
}