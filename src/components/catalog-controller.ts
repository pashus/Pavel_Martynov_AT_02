import { CatalogModel } from "./catalog-model";
import { CatalogView } from "./catalog-view";
import { EventEmitter } from "../components/base/events";
import { IProduct } from "../types/index";

export class CatalogController {
    private model: CatalogModel;
    private view: CatalogView;
    private eventEmitter: EventEmitter;

    constructor(model: CatalogModel, view: CatalogView, eventEmitter: EventEmitter) {
        this.model = model;
        this.view = view;
        this.eventEmitter = eventEmitter;

        this.eventEmitter.on<IProduct[]>('catalog:updated', (products) => {
            this.view.render(products);
        });

        this.eventEmitter.on<IProduct>('product:select', (product) => {
            console.log('Выбран продукт:', product);
        });
    }

    init() {
        this.model.fillCatalog();
    }
}