import {IProduct, IBasket} from '../types/index'

export class BasketModel implements IBasket{
    private items: Map<string, IProduct> = new Map();
    
    addItem(product: IProduct): void {
        this.items.set(product.id, product)
    }

    removeItem(product: IProduct): void {
        if (this.items.size === 0) return;
        this.items.delete(product.id)
    }

    get totalPrice(): number {
        return Array.from(this.items.values())
            .reduce((acc, product) => acc + product.price, 0);
    }
}