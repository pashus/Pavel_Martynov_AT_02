import { IOrderData, IView } from "../../types";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class OrderModalView implements IView<any> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;
    private savedAddress: string;
    private order: HTMLFormElement;
    private address: HTMLInputElement;
    private cardButton: HTMLButtonElement;
    private cashButton: HTMLButtonElement;
    private continueButton: HTMLButtonElement;
    private error: HTMLSpanElement;
    private paymentMethod: 'online' | 'offline' | null = null;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#order');
        this.eventEmitter = eventEmitter;
        this.savedAddress = '';
    }

    render(): HTMLElement {
        this.order = this.template.content.firstElementChild.cloneNode(true) as HTMLFormElement;
        this.address = this.order.querySelector('input[name="address"]') as HTMLInputElement;
        this.cardButton = this.order.querySelector('button[name="card"]') as HTMLButtonElement;
        this.cashButton = this.order.querySelector('button[name="cash"]') as HTMLButtonElement;
        this.continueButton = this.order.querySelector('.order__button') as HTMLButtonElement;
        this.error = this.order.querySelector('.form__errors') as HTMLSpanElement;
        
        this.address.value = this.savedAddress;
        if (this.paymentMethod === 'online') {
            this.cardButton.classList.add('button_alt-active');
        } else if (this.paymentMethod === 'offline') {
            this.cashButton.classList.add('button_alt-active');
        }

        this.setEventListeners();
        this.updateContinueButton();

        return this.order
    }

    private setEventListeners(): void {
        this.cardButton.addEventListener('click', () => {
            this.paymentMethod = 'online'
            this.cardButton.classList.add('button_alt-active')
            this.cashButton.classList.remove('button_alt-active')
            this.updateContinueButton();
        });

        this.cashButton.addEventListener('click', () => {
            this.paymentMethod = 'offline'
            this.cashButton.classList.add('button_alt-active')
            this.cardButton.classList.remove('button_alt-active')
            this.updateContinueButton();
        });
        
        this.address.addEventListener('input', () => {
            this.savedAddress = this.address.value;
            this.updateContinueButton();
        });

        this.continueButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            this.eventEmitter.emit(settings.orderDataConfirmed, {
                address: this.address.value,
                paymentMethod: this.paymentMethod
            } as IOrderData)
        });
    }

    private updateContinueButton(): void {
        if (this.paymentMethod !== null && this.address.value.trim() !== '') {
            this.continueButton.disabled = false;
        } else {
            this.continueButton.disabled = true;
        };

        this.error.textContent = this.validationError()
    }

    private validationError(): string {
        if (this.paymentMethod === null) {
            return 'Выберите способ оплаты';
        }
        if (this.address.value.trim() === '') {
            return 'Введите адрес';
        }
        return '';
    }

    reset(): void {
        this.savedAddress = '';
        this.paymentMethod = null;
    }
}