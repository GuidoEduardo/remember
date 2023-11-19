import { Request, ResultOrError, ResultsOrError } from '../@types/graphql';
import { Controller } from '../controller';
import { Searcher } from '../searcher';

export abstract class SearcherImpl<T> implements Searcher<T> {
	controller: Controller<T>;

	setController(controller: Controller<T>): void {
		this.controller = controller;
	}

	async get(request: { id: UUID }): Promise<ResultOrError<T>> {
		const result = await this.controller.get(request.id);

		return result;
	}

	async getAll(request: { options?: Request }): Promise<ResultsOrError<T>> {
		const results = await this.controller.getAll(request.options);

		return results;
	}

	async find(request: { options?: Request; by: MakeOptional<T> }): Promise<ResultsOrError<T>> {
		const results = await this.controller.find(request.by, request.options);

		return results;
	}
}
