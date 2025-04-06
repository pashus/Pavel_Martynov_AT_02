import { IProduct } from "../../types/index";
import { IEvents } from "../base/events";
import { CardBasketView } from "./card-basket-view";
import { IView } from "../../types/index";
import { settings } from "../../utils/constants";

export class BasketModalView implements IView<IProduct[]>{
    private template: HTMLTemplateElement;
    private eventEmitter: IEvents;
    private cardView: CardBasketView;

    constructor(eventEmitter: IEvents) {
        this.template = document.querySelector('#basket');
        this.eventEmitter = eventEmitter;
        this.cardView = new CardBasketView(eventEmitter);
    }

    render(data: IProduct[], totalPrice: number): HTMLElement {
        const basket = this.template.content.firstElementChild.cloneNode(true) as HTMLElement;
        const list = basket.querySelector('.basket__list')
        const price = basket.querySelector('.basket__price')
        const orderButton = basket.querySelector('.basket__button') as HTMLButtonElement;
        
        price.textContent = `${totalPrice} синапсов`
        
        if (data.length === 0) {
            orderButton.disabled = true;
        } else {
            data.forEach((product, index) => {
                const cardElement = this.cardView.render(product, index+1)
                //тут вот тоже ситуация как с карточками католога
                list.appendChild(cardElement)
            })
    
            orderButton.addEventListener('click', () => {
                this.eventEmitter.emit(settings.openOrder)
            })
        }

        return basket;
    }
}
