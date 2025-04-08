import { IOrderData, IView } from "../../types";
import { settings } from "../../utils/constants";
import { IEvents } from "../base/events";

export class ContactsModalView implements IView<any> {
    private template: HTMLTemplateElement;
    private eventEmitter: IEvents;
    private savedEmail: string;
    private savedPhone: string;
    private contacts: HTMLFormElement;
    private email: HTMLInputElement;
    private phone: HTMLInputElement;
    private payButton: HTMLButtonElement;
    private error: HTMLSpanElement;

    constructor(eventEmitter: IEvents) {
        this.template = document.querySelector('#contacts');
        this.eventEmitter = eventEmitter;
        this.savedEmail = '';
        this.savedPhone = '';
    }

    render(): HTMLElement {
        this.contacts = this.template.content.firstElementChild.cloneNode(true) as HTMLFormElement;
        this.email = this.contacts.querySelector('input[name="email"]') as HTMLInputElement;
        this.phone = this.contacts.querySelector('input[name="phone"]') as HTMLInputElement;
        this.payButton = this.contacts.querySelector('.button') as HTMLButtonElement;
        this.error = this.contacts.querySelector('.form__errors') as HTMLSpanElement;
        
        this.setInputs();
        this.setPayButton(); 

        return this.contacts;
    }

    private setInputs(): void {
        this.email.value = this.savedEmail;
        this.phone.value = this.savedPhone;

        this.email.addEventListener('input', () => {
            this.savedEmail = this.email.value;
            this.updatePayButton();
        });

        this.phone.addEventListener('input', () => {
            this.savedPhone = this.phone.value;
            this.updatePayButton();
        });
    }

    private setPayButton(): void {
        this.payButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.eventEmitter.emit(settings.contactsDataConfirmed, {
                email: this.email.value,
                phone: this.phone.value
            } as IOrderData);
        });

        this.updatePayButton();
    }

    private updatePayButton(): void {
        if (this.email.value.trim() !== '' && this.phone.value.trim() !== '') {
            this.payButton.disabled = false;
        } else {
            this.payButton.disabled = true;
        }

        this.error.textContent = this.validationError();
    }

    private validationError(): string {
        if (this.email.value.trim() === '') {
            return 'Введите почту';
        }
        if (this.phone.value.trim() === '') {
            return 'Введите телефон';
        }
        return '';
    }

    reset() {
        this.savedEmail = '';
        this.savedPhone = '';
    }
}