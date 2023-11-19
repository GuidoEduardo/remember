import { Controller } from './controller';

export interface Searcher<T> {
	setController(controller: Controller<T>): void;
}
