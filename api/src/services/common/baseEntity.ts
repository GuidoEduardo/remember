export abstract class BaseEntity<ID> {
	private _id: ID;

	get id(): ID {
		return this._id;
	}

	setId(id: ID): void {
		this._id = id;
	}
}
