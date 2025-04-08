import { IProduct } from "../../types/index";
import { IView } from "../../types/index";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class CardBasketView implements IView<IProduct> {
    private template: HTMLTemplateElement;
    private eventEmitter: IEvents;
    private item: HTMLLIElement;
    private index: HTMLSpanElement;
    private title: HTMLSpanElement;
    private price: HTMLSpanElement;
    private deleteButton: HTMLButtonElement;
    private product: IProduct;

    constructor(eventEmitter: IEvents) {
        this.template = document.querySelector('#card-basket');
        this.eventEmitter = eventEmitter;
    }

    render(data: IProduct, indexForItem: number): HTMLElement {
        this.product = data;
        this.item = this.template.content.firstElementChild.cloneNode(true) as HTMLLIElement;
        this.index = this.item.querySelector('.basket__item-index') as HTMLSpanElement;
        this.title = this.item.querySelector('.card__title') as HTMLSpanElement;
        this.price = this.item.querySelector('.card__price') as HTMLSpanElement;
        this.deleteButton = this.item.querySelector('.basket__item-delete') as HTMLButtonElement;
    
        this.index.textContent = indexForItem.toString();
        this.title.textContent = data.title;
        this.price.textContent = data.price === null
            ? 'Бесценно'
            : `${data.price} синапсов`;

        this.setEventListeners();

        return this.item;
    }

    private setEventListeners(): void {
        this.deleteButton.addEventListener('click', () => {
            this.eventEmitter.emit(settings.removeFromBasket, this.product);
        });
    }
}