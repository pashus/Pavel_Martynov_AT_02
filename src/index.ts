import './scss/styles.scss';
import { settings } from './utils/constants';
import { Api } from './components/base/api'
import { EventEmitter } from './components/base/events';
import { IOrderData, IProduct } from './types/index';
import { ModalView } from './components/view/modal-view';
import { CardModalView } from './components/view/card-modal-view';
import { CatalogModel } from './components/model/catalog-model';
import { CatalogView } from './components/view/catalog-view';
import { BasketModel } from './components/model/basket-model';
import { BasketModalView } from './components/view/basket-modal-view';
import { OrderModalView } from './components/view/order-modal-view';
import { OrderModel } from './components/model/order-model';
import { ContactsModalView } from './components/view/contacts-modal-view';
import { SuccessModalView } from './components/view/success-modal-view';

enum CurrentModalType { //возможно enum избыточен, но так читабельнее
    Basket = 'basket',
    Card = 'card',
    Order = 'order',
    Contacts = 'contacts',
    Success = 'success'
};
let currentModalType: CurrentModalType; //чтобы корректно работали модальные окна

const api = new Api(process.env.API_ORIGIN);
const eventEmitter = new EventEmitter();
const modalView = new ModalView();

const cardModalView = new CardModalView(eventEmitter);

const catalogModel = new CatalogModel(api, eventEmitter);
const catalogView = new CatalogView(eventEmitter);

const basketModel = new BasketModel(eventEmitter);
const basketModalView = new BasketModalView(eventEmitter);
const basketButton = document.querySelector('.header__basket');
const basketCounter = document.querySelector('.header__basket-counter');

const orderModalView = new OrderModalView(eventEmitter);
const orderModel = new OrderModel(api, eventEmitter);
const contactsModalView = new ContactsModalView(eventEmitter);
const successModalView = new SuccessModalView(eventEmitter);


//Получение карточек каталога
catalogModel.fillCatalog() //асинхронная функция

eventEmitter.on(settings.updateCatalog, (products: IProduct[]) => {
    catalogView.render(products);
})


//Открытие карточки
eventEmitter.on(settings.selectProduct, (product: IProduct) => {
    currentModalType = CurrentModalType.Card;
    const isInBasket = basketModel.hasItem(product)
    const cardModalElement = cardModalView.render(product, isInBasket)
    modalView.render(cardModalElement)
    modalView.open()
})


//Корзина
basketButton.addEventListener('click', () => {
    eventEmitter.emit(settings.openBasket)
})

eventEmitter.on(settings.addToBasket, (product: IProduct) => {
    basketModel.addItem(product)
})

eventEmitter.on(settings.removeFromBasket, (product: IProduct) => {
    basketModel.removeItem(product)
})

eventEmitter.on(settings.updateBasket, (products: IProduct[]) => {
    basketCounter.textContent = `${products.length}`;
    if (currentModalType === CurrentModalType.Basket) {
        const basketModalElement = basketModalView.render(products, basketModel.getTotalPrice());
        modalView.render(basketModalElement);
    }
})

eventEmitter.on(settings.openBasket, () => {
    currentModalType = CurrentModalType.Basket;
    const basketModalElement = basketModalView.render(basketModel.getItems(), basketModel.getTotalPrice());
    modalView.render(basketModalElement);
    modalView.open();
})


//Заказ
eventEmitter.on(settings.openOrder, () => {
    currentModalType = CurrentModalType.Order;
    const orderModalElement = orderModalView.render();
    modalView.render(orderModalElement);
    modalView.open();
})

eventEmitter.on(settings.orderDataConfirmed, (data: IOrderData) => {
    orderModel.setOrderData(data); //тут в заказ добавляется способ оплаты и адрес
    currentModalType = CurrentModalType.Contacts;
    const contactsModalElement = contactsModalView.render();
    modalView.render(contactsModalElement);
    modalView.open();
})

eventEmitter.on(settings.contactsDataConfirmed, async (data: IOrderData) => {
    orderModel.setOrderData({ //а уже тут остальное
        email: data.email,
        phone: data.phone,
        items: basketModel.getItems(),
        totalPrice: basketModel.getTotalPrice()
    });
    try {
        const orderResponse = await orderModel.sendOrder();
        console.log('Заказ успешно оформлен:', orderResponse);

        currentModalType = CurrentModalType.Success;
        const successModalElement = successModalView.render(basketModel.getTotalPrice());
        modalView.render(successModalElement);
        modalView.open();
        basketModel.clearItems();
        orderModalView.reset();
        contactsModalView.reset();
    } 
    catch (error) {
        console.error('Ошибка оформления заказа:', error);
    }
})

eventEmitter.on(settings.closeSuccess, () => {
    modalView.close()
})
