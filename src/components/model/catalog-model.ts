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

    }

    getProductById(id: string): IProduct {

    }

    getProducts(): IProduct[] {
        
    }
}