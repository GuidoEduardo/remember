export abstract class BaseId<T> {
	private _value: T;

	get getValue(): T {
		return this._value;
	}

	constructor(value: T) {
		this._value = value;
	}
}
