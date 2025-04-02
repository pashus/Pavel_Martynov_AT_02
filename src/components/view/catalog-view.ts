import { IProduct } from "../../types/index";
import { IView } from "../../types/index";
import { CardCatalogView } from "./card-catalog-view";
import { EventEmitter } from "../base/events";

export class CatalogView implements IView<IProduct[]> {
    private container: HTMLElement;
    private eventEmitter: EventEmitter;
    private cardView: CardCatalogView;

    constructor(eventEmitter: EventEmitter) {
        this.container = document.querySelector('.gallery') as HTMLElement;
        this.eventEmitter = eventEmitter;
        this.cardView = new CardCatalogView(eventEmitter);
    }

    render(data: IProduct[]): HTMLElement {
        this.container.innerHTML = '';

        data.forEach(product => {
            const card = this.cardView.render(product);
            this.container.appendChild(card);
        });

        return this.container;
    }
}
