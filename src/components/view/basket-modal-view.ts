import { IProduct } from "../../types/index";
import { EventEmitter } from "../base/events";
import { CardBasketView } from "./card-basket-view";
import { IView } from "../../types/index";
import { settings } from "../../utils/constants";

export class BasketModalView implements IView<IProduct[]>{
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#basket');
        this.eventEmitter = eventEmitter;
    }

    render(data: IProduct[], totalPrice: number): HTMLElement {
        //и тут тоже ситуация как в каталоге
    }
}