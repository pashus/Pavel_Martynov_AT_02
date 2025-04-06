import { IProduct } from "../../types";
import { EventEmitter } from "../base/events";
import { CDN_URL, settings } from "../../utils/constants";
import { IView } from "../../types/index";

enum ButtonStatus {
    Buy = 'Купить',
	Remove = 'Удалить из корзины'
}

export class CardModalView implements IView<IProduct>{
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#card-preview')
        this.eventEmitter = eventEmitter
    }

    render(data: IProduct, isInBasket: boolean): HTMLElement {

    }
}