export interface Repository<T> {
	create(object: T): Promise<T>;

	get(id: UUID): Promise<T | null>;

	find(filter: object): Promise<T[]>;

	// TODO
	// update(filter: object, data: object): Promise<T[]>;

	delete(id: UUID): Promise<boolean>;
}
