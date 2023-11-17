import { ErrorData } from "../../../../common/errorData";
import { Searcher } from "../../../../common/searcher";
import { UserDataOrError, UsersDataOrError } from "../../../@types/graphql";
import { UserData, UserFilter } from "../../../@types/user.schema";
import { UserController } from "../../../controllers/userController";

export class UserQuery implements Searcher<UserData, ErrorData> {
	private controller: UserController;

	setController(controller: UserController): void {
		this.controller = controller;
	}

	constructor(controller: UserController) {
		this.setController(controller);
	}

	async getUser(request: { id: UUID }): Promise<UserDataOrError> {
		const result = await this.controller.get(request.id);

		return result;
	}

	async getUsers(): Promise<UsersDataOrError> {
		const results = await this.controller.getAll();

		return results;
	}

	async findUser(request: { by: UserFilter }) {
		const results = await this.controller.find(request.by);

		return results;
	}
}
