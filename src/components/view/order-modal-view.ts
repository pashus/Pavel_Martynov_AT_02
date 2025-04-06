import { IOrderData as IOrderData, IView } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class OrderModalView implements IView<any> {
    private template: HTMLTemplateElement;
    private eventEmitter: IEvents;
    private savedAddress: string;
    private savedPaymentMethod: 'online' | 'offline' | null = null;

    constructor(eventEmitter: IEvents) {
        this.template = document.querySelector('#order');
        this.eventEmitter = eventEmitter;
        this.savedAddress = '';
    }

    render(): HTMLElement {
        const order = this.template.content.firstElementChild.cloneNode(true) as HTMLFormElement;
        let paymentMethod: 'online' | 'offline' | null = null;
        const address = order.querySelector('input[name="address"]') as HTMLInputElement;
        const cardButton = order.querySelector('button[name="card"]');
        const cashButton = order.querySelector('button[name="cash"]');
        const continueButton = order.querySelector('.order__button') as HTMLButtonElement;
        
        paymentMethod = this.savedPaymentMethod;
        address.value = this.savedAddress;

        if (this.savedPaymentMethod === 'online') {
            cardButton.classList.add('button_alt-active');
        } else if (this.savedPaymentMethod === 'offline') {
            cashButton.classList.add('button_alt-active');
        }

        cardButton.addEventListener('click', () => {
            paymentMethod = 'online'
            this.savedPaymentMethod = paymentMethod
            cardButton.classList.add('button_alt-active')
            cashButton.classList.remove('button_alt-active')
            updateContinueButton();
        })

        cashButton.addEventListener('click', () => {
            paymentMethod = 'offline'
            this.savedPaymentMethod = paymentMethod
            cashButton.classList.add('button_alt-active')
            cardButton.classList.remove('button_alt-active')
            updateContinueButton();
        })
        
        address.addEventListener('input', () => {
            this.savedAddress = address.value;
            updateContinueButton();
        });

        continueButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            this.eventEmitter.emit(settings.orderDataConfirmed, {
                address: address.value,
                paymentMethod: paymentMethod
            } as IOrderData)
        })

        function updateContinueButton() {
            if (paymentMethod !== null && address.value.trim() !== '') {
                continueButton.disabled = false;
            } else {
                continueButton.disabled = true;
            }
        };
        updateContinueButton();

        return order;
    }

    reset() {
        this.savedAddress = '';
        this.savedPaymentMethod = null;
    }
}