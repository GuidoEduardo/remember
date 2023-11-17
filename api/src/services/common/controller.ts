import { MutableRepository, Repository } from './repository';

export interface Controller<T, E> {
	create(data: object): Promise<object | E>;

	get(externalId: UUID): Promise<object | E>;

	getAll(): Promise<object | E>;

	find(filter: object): Promise<object | E>;
}

export interface MutableController<T, E> extends Controller<T, E> {
	update(externalId: UUID, data: object): Promise<object | E>;

	delete(externalId: UUID): Promise<string | E>;
}
