import { IOrderData, IView } from "../../types";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class OrderModalView implements IView<any> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#order');
        this.eventEmitter = eventEmitter;
    }

    render(): HTMLElement {

    }

    reset(): void {

    }
}