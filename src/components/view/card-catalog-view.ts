import { IProduct } from "../../types/index";
import { IView } from "../../types/index";
import { CDN_URL, settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class CardCatalogView implements IView<IProduct> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#card-catalog') 
        this.eventEmitter = eventEmitter;
    }

    render(data: IProduct): HTMLElement {

    }
}