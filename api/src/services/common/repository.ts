import { Request } from './@types/graphql';
import { GenericResults } from './@types/repository';

interface Repository<T> {
	create(data: T): Promise<T>;

	createMany(data: T[]): Promise<number>;

	get(externalId: UUID): Promise<T | void>;

	getAll(options: Request): Promise<GenericResults<T>>;

	find(options: Request, filter: object): Promise<GenericResults<T>>;
}

interface MutableRepository<T> extends Repository<T> {
	update(externalId: UUID, data: object): Promise<T>;

	delete(externalId: UUID): Promise<void>;
}

export { Repository, MutableRepository };
