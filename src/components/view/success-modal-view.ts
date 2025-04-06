import { IView } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class SuccessModalView implements IView<any> {
    private template: HTMLTemplateElement;
    private eventEmitter: IEvents;

    constructor(eventEmitter: IEvents) {
        this.template = document.querySelector('#success');
        this.eventEmitter = eventEmitter;
    }

    render(totalValue: number): HTMLElement {
        const success = this.template.content.firstElementChild.cloneNode(true) as HTMLFormElement;
        const value = success.querySelector('.order-success__description')
        const button = success.querySelector('.order-success__close')
        
        value.textContent = `Списано ${totalValue} синапсов`
        
        button.addEventListener('click', () => {
            this.eventEmitter.emit(settings.closeSuccess)
        })

        return success
    }
}