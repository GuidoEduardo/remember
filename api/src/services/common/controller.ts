import { Request, ResultOrError, ResultsOrError } from './@types/graphql';

export interface Controller<T> {
	create(data: object): Promise<ResultOrError<T>>;

	createMany(data: object): Promise<ResultOrError<number>>;

	get(externalId: UUID): Promise<ResultOrError<T>>;

	getAll(options?: Request): Promise<ResultsOrError<T>>;

	find(filter: object, options?: Request): Promise<ResultsOrError<T>>;
}

export interface MutableController<T> extends Controller<T> {
	update(externalId: UUID, data: object): Promise<ResultOrError<T>>;

	delete(externalId: UUID): Promise<ResultOrError<string>>;
}
