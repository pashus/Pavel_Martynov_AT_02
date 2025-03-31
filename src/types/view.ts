import { IView } from "./index";

export abstract class View<T> implements IView<T> {
    abstract render(data?: T): HTMLElement;
}