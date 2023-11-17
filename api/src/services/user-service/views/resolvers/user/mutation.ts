import { ErrorData } from "../../../../common/errorData";
import { Mutator } from "../../../../common/mutator";
import { UserDataOrError } from "../../../@types/graphql";
import { UserCreate, UserData, UserFilter } from "../../../@types/user.schema";
import { UserController } from "../../../controllers/userController";

export class UserMutator implements Mutator<UserData, ErrorData> {
	private controller: UserController;

	setController(controller: UserController): void {
		this.controller = controller;
	}

	constructor(controller: UserController) {
		this.setController(controller);
	}

	async createUser(request: { data: UserCreate }): Promise<UserDataOrError> {
		const result = await this.controller.create(request.data);

		return result;
	}

	async updateUser(request: { id: UUID, data: UserFilter }): Promise<UserDataOrError> {
		const result = await this.controller.update(request.id, request.data);

		return result;
	}

	async deleteUser(request: { id: UUID }): Promise<string | ErrorData> {
		const result = await this.controller.delete(request.id);

		return result;
	}
}
