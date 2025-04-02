import './scss/styles.scss';
import { settings } from './utils/constants';
import { Api } from './components/base/api'
import { EventEmitter } from './components/base/events';
import { IProduct } from './types/index';
import { ModalView } from './components/view/modal-view';
import { CardModalView } from './components/view/card-modal-view';
import { CatalogModel } from './components/model/catalog-model';
import { CatalogView } from './components/view/catalog-view';
import { BasketModel } from './components/model/basket-model';
import { BasketModalView } from './components/view/basket-modal-view';

const api = new Api(process.env.API_ORIGIN)
const eventEmitter = new EventEmitter()
const modalView = new ModalView()
let currentModalType: 'basket' | 'card' | null; //чтобы корректно работали модальные окна

const cardModalView = new CardModalView(eventEmitter, modalView)

const catalogModel = new CatalogModel(api, eventEmitter);
const catalogView = new CatalogView(eventEmitter);

const basketModel = new BasketModel(eventEmitter)
const basketModalView = new BasketModalView(eventEmitter, modalView)
const basketButton = document.querySelector('.header__basket')
const basketCounter = document.querySelector('.header__basket-counter')


//Получение карточек каталога
catalogModel.fillCatalog() //асинхронная функция

eventEmitter.on(settings.updateCatalog, (products: IProduct[]) => {
    catalogView.render(products);
})


//Открытие карточки
eventEmitter.on(settings.selectProduct, (product: IProduct) => {
    const isInBasket = basketModel.hasItem(product)
    currentModalType = 'card';
    cardModalView.render(product, isInBasket)
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
    basketCounter.textContent = `${products.length}`
    if (currentModalType === 'basket') {
        basketModalView.render(products, basketModel.totalPrice);
    }
})

eventEmitter.on(settings.openBasket, () => {
    currentModalType = 'basket';
    basketModalView.render(basketModel.getItems(), basketModel.totalPrice)
    modalView.open()
})

