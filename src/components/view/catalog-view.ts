import { IProduct } from "../../types/index";
import { IView } from "../../types/index";
import { CardCatalogView } from "./card-catalog-view";
import { IEvents } from "../base/events";

export class CatalogView implements IView<IProduct[]> {
    private container: HTMLElement;
    private eventEmitter: IEvents;

    constructor(eventEmitter: IEvents) {
        this.container = document.querySelector('.gallery') as HTMLElement;
        this.eventEmitter = eventEmitter;
    }

    render(data: IProduct[]): HTMLElement {
        data.forEach(product => {
            const cardView = new CardCatalogView(this.eventEmitter)
            const card = cardView.render(product);
            
            this.container.appendChild(card);
        });

        return this.container;
    }
}
