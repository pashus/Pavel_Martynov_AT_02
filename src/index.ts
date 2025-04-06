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