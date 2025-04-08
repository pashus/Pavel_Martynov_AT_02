import { IView } from "../../types";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";


export class SuccessModalView implements IView<any> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;
    private success: HTMLElement;
    private value: HTMLParagraphElement;
    private button: HTMLButtonElement;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#success');
        this.eventEmitter = eventEmitter;
    }

    render(totalValue: number): HTMLElement {
        this.success = this.template.content.firstElementChild.cloneNode(true) as HTMLFormElement;
        this.value = this.success.querySelector('.order-success__description') as HTMLParagraphElement;
        this.button = this.success.querySelector('.order-success__close') as HTMLButtonElement;
        
        this.value.textContent = `Списано ${totalValue} синапсов`;
        
        this.setEventListeners();

        return this.success;
    }

    private setEventListeners(): void {
        this.button.addEventListener('click', () => {
            this.eventEmitter.emit(settings.closeSuccess)
        });
    }
}