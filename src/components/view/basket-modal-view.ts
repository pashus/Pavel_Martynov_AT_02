import { IProduct } from "../../types/index";
import { EventEmitter } from "../base/events";
import { ModalView } from "./modal-view";
import { CardBasketView } from "./card-basket-view";
import { IView } from "../../types/index";

export class BasketModalView implements IView<IProduct[]>{
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;
    private modal: ModalView;

    constructor(eventEmitter: EventEmitter, modal: ModalView) {
        this.template = document.querySelector('#basket')
        this.eventEmitter = eventEmitter
        this.modal = modal
    }

    render(data: IProduct[], totalPrice: number): HTMLElement {
        const basket = this.template.content.firstElementChild.cloneNode(true) as HTMLElement;
        const list = basket.querySelector('.basket__list')
        const price = basket.querySelector('.basket__price')
        const cardView = new CardBasketView(this.eventEmitter)
        
        price.textContent = `${totalPrice} синапсов`
        
        data.forEach((product, index) => {
            const cardElement = cardView.render(product, index+1)
            list.appendChild(cardElement)
        })
        
        return basket;
    }
}
