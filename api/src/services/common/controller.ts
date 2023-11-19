import { ResultOrError, ResultsOrError } from "./@types/graphql";

export interface Controller<T> {
	create(data: object): Promise<ResultOrError<T>>;

	get(externalId: UUID): Promise<ResultOrError<T>>;

	getAll(): Promise<ResultsOrError<T>>;

	find(filter: object): Promise<ResultsOrError<T>>;
}

export interface MutableController<T> extends Controller<T> {
	update(externalId: UUID, data: object): Promise<ResultOrError<T>>;

	delete(externalId: UUID): Promise<ResultOrError<string>>;
}
