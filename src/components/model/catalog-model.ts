import { IProduct, IApiProvider, ICatalog } from '../../types/index'
import { ApiListResponse } from '../base/api'
import { EventEmitter } from '../base/events';
import { settings } from '../../utils/constants';

export class CatalogModel implements ICatalog{
    private products: IProduct[] = [];
    private api: IApiProvider;
    private eventEmitter: EventEmitter;

    constructor(api: IApiProvider, eventEmitter: EventEmitter) {
        this.api = api;
        this.eventEmitter = eventEmitter;
    }

    async fillCatalog(): Promise<void> {
        try {
            const response = await this.api.get('/api/weblarek/product') as ApiListResponse<IProduct>
            this.products = response.items
            this.eventEmitter.emit(settings.updateCatalog, this.products);
        } catch(error) {
            console.log(error);
        }
    }

    getProductById(id: string): IProduct {
        return this.products.find(product => {
            return product.id === id;
        })
    }

    getProducts(): IProduct[] {
        return this.products;
    }
}