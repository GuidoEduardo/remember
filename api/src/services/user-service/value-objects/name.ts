export class Name {
	private firstName: string;
	private lastName: string;

	get first() {
		return this.firstName;
	}

	get last() {
		return this.lastName;
	}

	constructor(firstName: string, lastName: string) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
