import { IProduct } from "../../types/index";
import { IEvents } from "../base/events";
import { CardBasketView } from "./card-basket-view";
import { IView } from "../../types/index";
import { settings } from "../../utils/constants";

export class BasketModalView implements IView<IProduct[]>{
    private template: HTMLTemplateElement;
    private eventEmitter: IEvents;
    private basket: HTMLElement;
    private list: HTMLUListElement;
    private price: HTMLSpanElement;
    private orderButton: HTMLButtonElement;

    constructor(eventEmitter: IEvents) {
        this.template = document.querySelector('#basket');
        this.eventEmitter = eventEmitter;
    }

    render(data: IProduct[], totalPrice: number): HTMLElement {
        this.basket = this.template.content.firstElementChild.cloneNode(true) as HTMLUListElement;
        this.list = this.basket.querySelector('.basket__list') as HTMLUListElement;
        this.price = this.basket.querySelector('.basket__price') as HTMLSpanElement;
        this.orderButton = this.basket.querySelector('.basket__button') as HTMLButtonElement;
        
        this.price.textContent = `${totalPrice} синапсов`;
        
        if (data.length === 0) {
            this.orderButton.disabled = true;
        } else {
            data.forEach((product, index) => {
                const cardView = new CardBasketView(this.eventEmitter)
                const cardElement = cardView.render(product, index+1)
                this.list.appendChild(cardElement)
            });
        }

        this.setEventListeners();

        return this.basket;
    }

    private setEventListeners(): void {
        this.orderButton.addEventListener('click', () => {
            this.eventEmitter.emit(settings.openOrder);
        });
    }
}
