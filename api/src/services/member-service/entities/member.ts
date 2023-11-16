import { AggregateRoot } from "../../common/aggregateRoot";
import { MemberId } from "../value-objects/memberId";
import { Name } from "../value-objects/name";

class Member extends AggregateRoot<MemberId> {
	private _username: String;
	private _email: String;
	private _name: Name;

	constructor(builder: Builder) {
		super();
		super.setId(builder.memberId);
		this._username = builder.username;
		this._email = builder.email;
		this._name = builder.name;
	}

	newBuilder(): Builder {
		return new Builder();
	}
}

class Builder {
	memberId: MemberId;
	username: String;
	email: String;
	name: Name;

	setMemberId(value: MemberId) {
		this.memberId = value;
	}

	setUsername(value: String) {
		this.username = value;
	}

	setEmail(value: String) {
		this.email = value;
	}

	setName(value: Name) {
		this.name = value;
	}

	build(): Member {
		return new Member(this);
	}
}

export { Member }
