import { IProduct } from "../../types/index";
import { IView } from "../../types/index";
import { CDN_URL, colorCategory, settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class CardCatalogView implements IView<IProduct> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#card-catalog') 
        this.eventEmitter = eventEmitter;
    }

    render(data: IProduct): HTMLElement {
        const card = this.template.content.firstElementChild.cloneNode(true) as HTMLElement;
        const title = card.querySelector('.card__title') as HTMLElement;
        const category = card.querySelector('.card__category') as HTMLElement;
        const price = card.querySelector('.card__price') as HTMLElement;
        const image = card.querySelector('.card__image') as HTMLImageElement;
        
        title.textContent = data.title
        category.textContent = data.category
        colorCategory(category, data)
        price.textContent = data.price === null
            ? 'Бесценно'
            : `${data.price} синапсов`;
        image.src = `${CDN_URL}${data.image}`
        image.alt = data.title

        card.addEventListener('click', () => {
            this.eventEmitter.emit(settings.selectProduct, data);
        });

        return card;
    }

}