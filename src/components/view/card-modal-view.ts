import { IProduct } from "../../types";
import { ModalView } from "./modal-view";
import { EventEmitter } from "../base/events";
import { CDN_URL, colorCategory, settings } from "../../utils/constants";
import { IView } from "../../types/index";

enum ButtonStatus {
    Buy = 'Купить',
	Remove = 'Удалить из корзины'
}

export class CardModalView implements IView<IProduct>{
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;
    private modal: ModalView;

    constructor(eventEmitter: EventEmitter, modal: ModalView) {
        this.template = document.querySelector('#card-preview')
        this.eventEmitter = eventEmitter
        this.modal = modal
    }

    render(data: IProduct, isInBasket: boolean): HTMLElement {
        const card = this.template.content.firstElementChild.cloneNode(true) as HTMLElement;
        const title = card.querySelector('.card__title') as HTMLElement;
        const image = card.querySelector('.card__image') as HTMLImageElement;
        const category = card.querySelector('.card__category') as HTMLElement;
        const price = card.querySelector('.card__price') as HTMLElement;
        const text = card.querySelector('.card__text') as HTMLElement;
        const button = card.querySelector('.card__button') as HTMLButtonElement;

        image.src = image.src = `${CDN_URL}${data.image}`
        image.alt = data.title;
        title.textContent = data.title;
        category.textContent = data.category;
        colorCategory(category, data)
        text.textContent = data.description;
        if (data.price === null) {
            price.textContent = 'Бесценно'
            button.setAttribute('disabled', 'true')
        } else {
            price.textContent = `${data.price} синапсов`
        }
        button.textContent = isInBasket ? ButtonStatus.Remove : ButtonStatus.Buy;

        button.addEventListener("click", () => {
            if (button.textContent === ButtonStatus.Buy) {
                this.eventEmitter.emit(settings.addToBasket, data);
                button.textContent = ButtonStatus.Remove;
            } else {
                this.eventEmitter.emit(settings.removeFromBasket, data);
                button.textContent = ButtonStatus.Buy;
            }
        });
        
        return card;
    }
}