import { IOrderData, IView } from "../../types";
import { settings } from "../../utils/constants";
import { EventEmitter } from "../base/events";

export class ContactsModalView implements IView<any> {
    private template: HTMLTemplateElement;
    private eventEmitter: EventEmitter;
    private savedEmail: string;
    private savedPhone: string;

    constructor(eventEmitter: EventEmitter) {
        this.template = document.querySelector('#contacts');
        this.eventEmitter = eventEmitter;
        this.savedEmail = '';
        this.savedPhone = '';
    }

    render(): HTMLElement {
        const contacts = this.template.content.firstElementChild.cloneNode(true) as HTMLFormElement;
        const email = contacts.querySelector('input[name="email"]') as HTMLInputElement;
        const phone = contacts.querySelector('input[name="phone"]') as HTMLInputElement;
        const payButton = contacts.querySelector('.button') as HTMLButtonElement;

        email.value = this.savedEmail;
        phone.value = this.savedPhone;  

        email.addEventListener('input', () => {
            this.savedEmail = email.value;
            updatePayButton();
        });
        phone.addEventListener('input', () => {
            this.savedPhone = phone.value;
            updatePayButton();
        });

        payButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            this.eventEmitter.emit(settings.contactsDataConfirmed, {
                email: email.value,
                phone: phone.value
            } as IOrderData)
        })

        function updatePayButton() {
            if (email.value.trim() !== '' && phone.value.trim() !== '') {
                payButton.disabled = false;
            } else {
                payButton.disabled = true;
            }
        };
        updatePayButton()

        return contacts;
    }

    reset() {
        this.savedEmail = '';
        this.savedPhone = '';
    }
}