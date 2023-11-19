import { Controller } from './controller';

export interface Mutator<T> {
	setController(controller: Controller<T>): void;
}
