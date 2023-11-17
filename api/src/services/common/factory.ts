export interface Factory<T> {
	create(object: object): T;
}
