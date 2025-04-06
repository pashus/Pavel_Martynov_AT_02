import { IProduct } from "../../types/index";
import { IView } from "../../types/index";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class CardBasketView implements IView<IProduct> {
    private template: HTMLTemplateElement;
    private eventEmitter: IEvents;

    constructor(eventEmitter: IEvents) {
        this.template = document.querySelector('#card-basket')
        this.eventEmitter = eventEmitter
    }

    render(data: IProduct, indexForItem: number): HTMLElement {
        const item = this.template.content.firstElementChild.cloneNode(true) as HTMLElement;
        const index = item.querySelector('.basket__item-index') as HTMLElement;
        const title = item.querySelector('.card__title') as HTMLSpanElement;
        const price = item.querySelector('.card__price') as HTMLElement;
        const deleteButton = item.querySelector('.basket__item-delete') as HTMLElement;
    
        index.textContent = indexForItem.toString()
        title.textContent = data.title
        price.textContent = data.price === null
            ? 'Бесценно'
            : `${data.price} синапсов`;

        deleteButton.addEventListener('click', () => {
            this.eventEmitter.emit(settings.removeFromBasket, data)
        })

        return item;
    }
}