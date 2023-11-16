export interface Repository<T> {
	create(object: T): Promise<T>;

	get(id: UUID): Promise<T>;

	find(filter: object): Promise<T[]>;

	update(filter: object): Promise<T[]>;

	delete(id: UUID): Promise<T>;
}
