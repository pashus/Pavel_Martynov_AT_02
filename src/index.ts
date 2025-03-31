import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api'
import { CatalogModel } from './components/catalog-model';
import { CatalogView } from './components/catalog-view';
import { CatalogController } from './components/catalog-controller';

const api = new Api(process.env.API_ORIGIN)
const eventEmitter = new EventEmitter()

///Получение карточек каталога
const catalogModel = new CatalogModel(api, eventEmitter);
const catalogView = new CatalogView(eventEmitter);
const catalogController = new CatalogController(catalogModel, catalogView, eventEmitter)

catalogController.init()

