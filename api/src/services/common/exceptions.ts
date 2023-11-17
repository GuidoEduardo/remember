class NotFoundError extends Error {
	constructor() {
		super('NotFoundError');

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

class UnknownError extends Error {
	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, UnknownError.prototype);
	}
}

class UniqueFieldError extends Error {
	private fields: any[];

	get getFields() {
		return this.fields;
	}

	constructor(fields: any[], message: string) {
		super(message);
		this.fields = fields;

		Object.setPrototypeOf(this, UniqueFieldError.prototype);
	}
}

class InvalidFieldError extends Error {
	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, InvalidFieldError.prototype);
	}
}

export { UnknownError, NotFoundError, UniqueFieldError, InvalidFieldError };
