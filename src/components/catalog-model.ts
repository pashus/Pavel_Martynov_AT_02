import { IProduct, IApiProvider, ICatalog } from '../types/index'
import { ApiListResponse } from '../components/base/api'
import { EventEmitter } from '../components/base/events';

export class CatalogModel implements ICatalog{
    private _products: IProduct[] = [];
    private api: IApiProvider;
    private eventEmitter: EventEmitter;

    constructor(api: IApiProvider, eventEmitter: EventEmitter) {
        this.api = api;
        this.eventEmitter = eventEmitter;
    }

    async fillCatalog(): Promise<void> {
        try {
            const response = await this.api.get('/api/weblarek/product') as ApiListResponse<IProduct>
            this._products = response.items
            this.eventEmitter.emit('catalog:updated', this._products);
        } catch(error) {
            console.log(error);
        }
    }

    getProductById(id: string): IProduct {
        return this._products.find(product => {
            return product.id === id;
        })
    }

    get products(): IProduct[] {
        return this._products;
    }
}