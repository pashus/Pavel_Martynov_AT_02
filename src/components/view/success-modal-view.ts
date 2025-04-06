import { IView } from "../../types";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";


export class SuccessModalView implements IView<any> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#success');
        this.eventEmitter = eventEmitter;
    }

    render(totalValue: number): HTMLElement {

    }
}