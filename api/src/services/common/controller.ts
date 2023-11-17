import { Repository } from "./repository";

export interface Controller<T, E> {
	SetRepository(repository: Repository<T>): void;

	create(object: object): Promise<T | E>;

	get(externalId: UUID): Promise<T | E>;

	getAll(): Promise<T[] | E>;

	find(object: object): Promise<T[] | E>;

	update(externalId: UUID, object: object): Promise<T | E>;

	delete(externalId: UUID): Promise<string | E>;

	handleError(err: any): E;
}
