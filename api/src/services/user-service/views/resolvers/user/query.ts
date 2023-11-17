import { ErrorEvent } from '../../../../common/@types/error';
import { Searcher } from '../../../../common/searcher';
import { UserOrError, UsersOrError } from '../../../@types/graphql';
import { User, UserFilter } from '../../../@types/user';
import { UserController } from '../../../controllers/userController';

export class UserQuery implements Searcher<User, ErrorEvent> {
	private controller: UserController;

	setController(controller: UserController): void {
		this.controller = controller;
	}

	constructor(controller: UserController) {
		this.setController(controller);
	}

	async getUser(request: { id: UUID }): Promise<UserOrError> {
		const result = await this.controller.get(request.id);

		return result;
	}

	async getUsers(): Promise<UsersOrError> {
		const results = await this.controller.getAll();

		return results;
	}

	async findUser(request: { by: UserFilter }): Promise<UsersOrError> {
		const results = await this.controller.find(request.by);

		return results;
	}
}
