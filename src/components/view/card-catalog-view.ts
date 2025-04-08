import { IProduct } from "../../types/index";
import { IView } from "../../types/index";
import { CDN_URL, colorCategory, settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class CardCatalogView implements IView<IProduct> {
    private template: HTMLTemplateElement;
    private eventEmitter: IEvents;
    private card: HTMLButtonElement;
    private title: HTMLHeadingElement;
    private category: HTMLSpanElement;
    private price: HTMLSpanElement;
    private image: HTMLImageElement;
    private product: IProduct;

    constructor(eventEmitter: IEvents) {
        this.template = document.querySelector('#card-catalog');
        this.eventEmitter = eventEmitter;
    }

    render(data: IProduct): HTMLElement {
        this.product = data;
        this.card = this.template.content.firstElementChild.cloneNode(true) as HTMLButtonElement;
        this.title = this.card.querySelector('.card__title') as HTMLHeadingElement;
        this.category = this.card.querySelector('.card__category') as HTMLSpanElement;
        this.price = this.card.querySelector('.card__price') as HTMLSpanElement;
        this.image = this.card.querySelector('.card__image') as HTMLImageElement;
        
        this.title.textContent = data.title;
        this.category.textContent = data.category;
        this.price.textContent = data.price === null
            ? 'Бесценно'
            : `${data.price} синапсов`;
        this.image.src = `${CDN_URL}${data.image}`;
        this.image.alt = data.title;

        colorCategory(this.category, data);
        this.setEventListeners();

        return this.card;
    }

    private setEventListeners(): void {
        this.card.addEventListener('click', () => {
            this.eventEmitter.emit(settings.selectProduct, this.product);
        });
    }
}