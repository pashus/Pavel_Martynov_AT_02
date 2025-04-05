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
        data.forEach(product => {
            const card = this.cardView.render(product);
            //если честно, не до конца понял, под каждую карточку
            //нужен отдельный экземпляр или нет. потому что у нас же
            //просто отображение, карточки как самостоятельные
            //единицы не используются
            this.container.appendChild(card);
        });

        return this.container;
    }
}
