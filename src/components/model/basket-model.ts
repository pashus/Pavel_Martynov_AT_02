import { IBasket, IProduct } from '../../types/index'
import { settings } from '../../utils/constants';
import { EventEmitter } from "../base/events";

export class BasketModel implements IBasket {
    private items: Map<string, IProduct> = new Map();
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.eventEmitter = eventEmitter
    }

    addItem(product: IProduct): void {

    }

    removeItem(product: IProduct): void {

    }

    getItems(): IProduct[] {

    }

    hasItem(product: IProduct): boolean {

    }

    getTotalPrice(): number {

    }

    clearItems(): void {
        
    }
}