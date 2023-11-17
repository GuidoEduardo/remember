export abstract class BaseId<T> {
	private value: T;

	get getValue() {
		return this.value;
	}

	constructor(value: T) {
		this.value = value;
	}
}
