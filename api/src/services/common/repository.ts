interface Repository<T> {
	create(object: T): Promise<T>;

	get(externalId: UUID): Promise<T | null>;

	getAll(): Promise<T[]>;

	find(filter: object): Promise<T[]>;

	handleError(err: any): void;
}

interface MutableRepository<T> extends Repository<T> {
	update(externalId: UUID, data: object): Promise<T>;

	delete(externalId: UUID): Promise<void>;
}

export { Repository, MutableRepository };
