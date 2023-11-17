import { Controller } from "./controller";

export interface Searcher<T, E> {
	setController(controller: Controller<T, E>): void;
}
