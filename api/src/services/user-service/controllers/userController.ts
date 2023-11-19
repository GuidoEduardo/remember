import { randomUUID } from 'crypto';
import { UserCreate, UserOptional } from '../@types/user';
import { UserRepository } from '../repositories/userRepository';
import { User as UserType, Users as UsersType } from '../@types/user';
import { User, Users } from '../entities/user';
import { UserOrError, UsersOrError } from '../@types/graphql';
import { ErrorEvent as ErrorEventType } from '../../common/@types/error';
import { MutableControllerImpl } from '../../common/controllers/mutableController';

export class UserController extends MutableControllerImpl<UserType> {
	repository: UserRepository;

	constructor(repository: UserRepository) {
		super();
		this.repository = repository;
	}

	@UserController.handleError
	async create(userRequest: UserCreate): Promise<UserOrError> {
		const requestedUser = await User.parseAsync({
			externalId: randomUUID(),
			...userRequest,
		});

		const user = await User.parseAsync(await this.repository.create(requestedUser));

		return {
			__typename: 'User',
			...user,
		};
	}

	@UserController.handleError
	async get(externalId: UUID): Promise<UserOrError> {
		const user = await User.parseAsync(await this.repository.get(externalId));

		return {
			__typename: 'User',
			...user,
		};
	}

	@UserController.handleError
	async getAll(): Promise<UsersOrError> {
		const users = await Users.parseAsync(await this.repository.getAll());

		return {
			__typename: 'Users',
			objects: users,
		};
	}

	@UserController.handleError
	async find(filter: UserOptional): Promise<UsersOrError> {
		const users = await Users.parseAsync(await this.repository.find(filter));

		return {
			__typename: 'Users',
			objects: users,
		};
	}

	@UserController.handleError
	async update(id: UUID, data: UserOptional): Promise<UserOrError> {
		const user = await User.parseAsync(await this.repository.update(id, data));

		return {
			__typename: 'User',
			...user,
		};
	}

	@UserController.handleError
	async delete(id: UUID): Promise<string | ErrorEventType> {
		await this.repository.delete(id);

		return 'User deleted succesfully.';
	}
}
