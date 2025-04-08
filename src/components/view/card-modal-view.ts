import { IProduct } from "../../types";
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
    private card: HTMLElement;
    private title: HTMLHeadingElement;
    private image: HTMLImageElement;
    private category: HTMLSpanElement;
    private price: HTMLSpanElement;
    private text: HTMLParagraphElement;
    private button: HTMLButtonElement;
    private isInBasket: boolean;
    private product: IProduct;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#card-preview')
        this.eventEmitter = eventEmitter
    }

    render(data: IProduct, isInBasket: boolean): HTMLElement {
        this.product = data;
        this.isInBasket = isInBasket;
        this.card = this.template.content.firstElementChild.cloneNode(true) as HTMLElement;
        this.title = this.card.querySelector('.card__title') as HTMLHeadingElement;
        this.image = this.card.querySelector('.card__image') as HTMLImageElement;
        this.category = this.card.querySelector('.card__category') as HTMLSpanElement;
        this.price = this.card.querySelector('.card__price') as HTMLSpanElement;
        this.text = this.card.querySelector('.card__text') as HTMLParagraphElement;
        this.button = this.card.querySelector('.card__button') as HTMLButtonElement;
        
        this.image.src = this.image.src = `${CDN_URL}${data.image}`
        this.image.alt = data.title;
        this.title.textContent = data.title;
        this.category.textContent = data.category;
        this.text.textContent = data.description;
        
        if (data.price === null) {
            this. price.textContent = 'Бесценно'
            this.button.setAttribute('disabled', 'true')
        } else {
            this.price.textContent = `${data.price} синапсов`
        }

        colorCategory(this.category, data);
        this.setButton();

        return this.card;
    }
    
    private setButton(): void {
        this.updateButton()
        this.button.addEventListener("click", () => {
            if (this.isInBasket) {
                this.eventEmitter.emit(settings.removeFromBasket, this.product);
                this.isInBasket = false;
            } else {
                this.eventEmitter.emit(settings.addToBasket, this.product);
                this.isInBasket = true;
            }
            this.updateButton();
        });
    }

    private updateButton(): void {
        this.button.textContent = this.isInBasket ? ButtonStatus.Remove : ButtonStatus.Buy;
    }
}