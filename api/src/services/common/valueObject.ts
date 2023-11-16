export abstract class BaseId<T> {
	value: T;

	constructor(value: T) {
		this.value = value;
	}
}
