import { AggregateRoot } from "../../common/aggregateRoot";
import { UserId } from "../value-objects/userId";
import { Name } from "../value-objects/name";

class User extends AggregateRoot<UserId> {
	private username: string;
	private email: string;
	private name: Name;

	get data() {
		return {
			externalId: this.id.value,
			username: this.username,
			email: this.email,
			firstName: this.name.first,
			lastName: this.name.last
		}
	}

	constructor(builder: UserBuilder) {
		super();
		super.id = builder.id;
		this.username = builder.username;
		this.email = builder.email;
		this.name = builder.name;
	}

	static newBuilder(): UserBuilder {
		return new UserBuilder();
	}
}

class UserBuilder {
	id: UserId;
	username: string;
	email: string;
	name: Name;

	setId(value: UserId): UserBuilder {
		this.id = value;
		return this;
	}

	setUsername(value: string): UserBuilder {
		this.username = value;
		return this;
	}

	setEmail(value: string): UserBuilder {
		this.email = value;
		return this;
	}

	setName(value: Name): UserBuilder {
		this.name = value;
		return this;
	}

	build(): User {
		return new User(this);
	}
}

export { User, UserBuilder };
