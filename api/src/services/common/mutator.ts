import { Controller } from "./controller";

export interface Mutator<T, E> {
	setController(controller: Controller<T, E>): void;
}
