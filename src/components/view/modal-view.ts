export class ModalView {
    private modal: HTMLElement;
    private content: HTMLElement;
    private closeButton: HTMLButtonElement;

    constructor() {
        this.modal = document.querySelector('#modal-container') as HTMLElement;
        this.content = this.modal.querySelector('.modal__content') as HTMLElement; 
        this.closeButton = this.modal.querySelector('.modal__close') as HTMLButtonElement;
    
        this.closeButton.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', evt => {
            if (evt.target === this.modal) {
                this.close();
            }
        });
    }

    open(): void {
        this.modal.classList.add('modal_active');
    }

    close(): void {
        this.modal.classList.remove('modal_active');
    }

    render(modal: HTMLElement): void {
        this.content.replaceChildren(modal);
    }
} 