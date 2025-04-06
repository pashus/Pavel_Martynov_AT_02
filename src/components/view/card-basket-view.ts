import { IProduct } from "../../types/index";
import { IView } from "../../types/index";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class CardBasketView implements IView<IProduct> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#card-basket')
        this.eventEmitter = eventEmitter
    }

    render(data: IProduct, indexForItem: number): HTMLElement {
        
    }
}