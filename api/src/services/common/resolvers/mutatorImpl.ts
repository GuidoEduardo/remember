import { Controller, MutableController } from '../controller';
import { Mutator } from '../mutator';
import { ResultOrError } from '../@types/graphql';

abstract class MutatorImpl<T> implements Mutator<T> {
	controller: Controller<T>;

	setController(controller: Controller<T>): void {
		this.controller = controller;
	}

	async create(request: { data: MakeOptional<T> }): Promise<ResultOrError<T>> {
		const result = await this.controller.create(request.data);

		return result;
	}
}

abstract class MutableMutatorImpl<T> extends MutatorImpl<T> {
	controller: MutableController<T>;

	setController(controller: MutableController<T>): void {
		this.controller = controller;
	}

	constructor(controller: MutableController<T>) {
		super();
		this.controller = controller;
	}

	async update(request: { id: UUID; data: MakeOptional<T> }): Promise<ResultOrError<T>> {
		const result = await this.controller.update(request.id, request.data);

		return result;
	}

	async delete(request: { id: UUID }): Promise<ResultOrError<string>> {
		const result = await this.controller.delete(request.id);

		return result;
	}
}

export { MutatorImpl, MutableMutatorImpl };
