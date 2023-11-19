import { ErrorEvent } from '../../../../common/@types/error';
import { Mutator } from '../../../../common/mutator';
import { UserOrError } from '../../../@types/graphql';
import { UserCreate, User, UserOptional } from '../../../@types/user';
import { UserController } from '../../../controllers/userController';

export class UserMutator implements Mutator<User, ErrorEvent> {
	private controller: UserController;

	setController(controller: UserController): void {
		this.controller = controller;
	}

	constructor(controller: UserController) {
		this.setController(controller);
	}

	async createUser(request: { data: UserCreate }): Promise<UserOrError> {
		const result = await this.controller.create(request.data);

		return result;
	}

	async updateUser(request: { id: UUID; data: UserOptional }): Promise<UserOrError> {
		const result = await this.controller.update(request.id, request.data);

		return result;
	}

	async deleteUser(request: { id: UUID }): Promise<string | ErrorEvent> {
		const result = await this.controller.delete(request.id);

		return result;
	}
}
