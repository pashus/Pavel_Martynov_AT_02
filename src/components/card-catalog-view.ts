import { IProduct } from "../types/index";
import { View } from "../types/view";
import { EventEmitter } from "../components/base/events";

export class CardCatalogView extends View<IProduct> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        super()
        this.template = document.querySelector('#card-catalog') 
        this.eventEmitter = eventEmitter;
    }

    render(data: IProduct) {
        const card = this.template.content.firstElementChild.cloneNode(true) as HTMLElement
        const title = card.querySelector('.card__title') as HTMLElement
        const category = card.querySelector('.card__category') as HTMLElement
        const price = card.querySelector('.card__price') as HTMLElement
        const image = card.querySelector('.card__image') as HTMLImageElement
        
        title.textContent = data.title
        category.textContent = data.category
        if (data.price === null) {
            price.textContent = `Бесценно`
        } else {
            price.textContent = `${data.price} синапсов`
        }
        image.src = data.image
        image.alt = data.title

        card.addEventListener('click', () => {
            this.eventEmitter.emit('product:select', data);
        });

        return card;
    }

}