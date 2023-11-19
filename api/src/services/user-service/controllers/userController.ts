import { randomUUID } from 'crypto';
import { UserCreate, UserOptional } from '../@types/user';
import { UserRepository } from '../repositories/userRepository';
import { User as UserType } from '../@types/user';
import { User, Users } from '../entities/user';
import { UserOrError, UsersOrError } from '../@types/graphql';
import { MutableControllerImpl } from '../../common/controllers/mutableControllerImpl';
import { Request, ResultOrError } from '../../common/@types/graphql';
import { setOptions } from '../../common/utils/requestUtilities';

export class UserController extends MutableControllerImpl<UserType> {
	repository: UserRepository;

	constructor(repository: UserRepository) {
		super();
		this.repository = repository;
	}

	@UserController.handleError
	async create(userRequest: UserCreate): Promise<UserOrError> {
		const requestedUser = await User.parseAsync({
			...userRequest,
			externalId: userRequest.externalId || randomUUID(),
		});

		const user = await User.parseAsync(await this.repository.create(requestedUser));

		return {
			__typename: 'User',
			...user,
		};
	}

	@UserController.handleError
	async createMany(userRequests: UserCreate[]): Promise<ResultOrError<number>> {
		userRequests = userRequests.map((user) => ({ ...user, externalId: user.externalId || randomUUID() }));

		const requestedUsers = await Users.parseAsync(userRequests);

		const usersCount = await this.repository.createMany(requestedUsers);

		return usersCount;
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
	async getAll(options?: Request): Promise<UsersOrError> {
		options = setOptions(options);

		let { objects, pages } = await this.repository.getAll(options);

		objects = await Users.parseAsync(objects);

		return {
			__typename: 'Users',
			offset: options.offset,
			pages,
			currentPage: options.currentPage,
			objects,
		};
	}

	@UserController.handleError
	async find(filter: UserOptional, options?: Request): Promise<UsersOrError> {
		options = setOptions(options);

		let { objects, pages } = await this.repository.find(options, filter);

		objects = await Users.parseAsync(objects);

		return {
			__typename: 'Users',
			offset: options.offset,
			pages,
			currentPage: options.currentPage,
			objects,
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
	async delete(id: UUID): Promise<ResultOrError<string>> {
		await this.repository.delete(id);

		return 'User deleted succesfully.';
	}
}
