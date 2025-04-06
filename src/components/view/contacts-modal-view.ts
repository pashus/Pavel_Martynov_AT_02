import { IOrderData, IView } from "../../types";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class ContactsModalView implements IView<any> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#contacts');
        this.eventEmitter = eventEmitter;
    }

    render(): HTMLElement {

    }

    reset(): void {
        
    } 
}