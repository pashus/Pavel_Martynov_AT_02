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
        const succsess = this.template.content.firstElementChild.cloneNode(true) as HTMLFormElement;
        const value = succsess.querySelector('.order-success__description')
        const button = succsess.querySelector('.order-success__close')
        
        value.textContent = `Списано ${totalValue} синапсов`
        
        button.addEventListener('click', () => {
            this.eventEmitter.emit(settings.closeSuccess)
        })

        return succsess
    }
}