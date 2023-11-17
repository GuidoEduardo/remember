import { randomUUID } from "crypto";
import { Controller } from "../../common/controller";
import { UserCreate, UserData, UserFilter } from "../@types/user.schema";
import { UserRepository } from "../repositories/userRepository";
import { UserSchema, UserSchemas } from "../schemas/user.schema";
import { InvalidFieldError, NotFoundError, UniqueFieldError, UnknownError } from "../../common/exceptions";
import { ErrorData, ErrorSchema } from "../../common/errorData";
import { ZodError } from "zod";
import { UserDataOrError, UsersDataOrError } from "../@types/graphql";


export class UserController implements Controller<UserData, ErrorData> {
	private repository: UserRepository;

	SetRepository(repository: UserRepository): void {
		this.repository = repository;
	}

	constructor(repository: UserRepository) {
		this.SetRepository(repository);
	}

	async create(userRequest: UserCreate): Promise<UserDataOrError> {
		try {
			const requestedUserData = await UserSchema.parseAsync({
				externalId: randomUUID(),
				...userRequest
			});

			const createdUser = await this.repository.create(requestedUserData);

			const userData = await UserSchema.parseAsync(createdUser);

			return {
				__typename: 'User',
				...userData
			}

		} catch(err) {
			return this.handleError(err);
		}
	}

	async get(externalId: UUID): Promise<UserDataOrError> {
		try {
			const userData = await UserSchema.parseAsync(await this.repository.get(externalId));

			return {
				__typename: 'User',
				...userData
			}

		} catch (err) {
			return this.handleError(err);
		}
	}

	async getAll(): Promise<UsersDataOrError> {
		try {
			const usersData = await UserSchemas.parseAsync(await this.repository.getAll());

			return {
				__typename: 'Users',
				users: usersData
			}
		} catch (err) {
			return this.handleError(err);
		}
	}

	async find(filter: UserFilter): Promise<UsersDataOrError> {
		try {
			const usersData = await UserSchemas.parseAsync(await this.repository.find(filter))

			return {
				__typename: 'Users',
				users: usersData
			}

		} catch (err) {
			return this.handleError(err);
		}
	}

	async update(id: UUID, data: UserFilter): Promise<UserDataOrError> {
		try {
			const userData = await UserSchema.parseAsync(await this.repository.update(id, data))

			return {
				__typename: 'User',
				...userData
			}

		} catch (err) {
			return this.handleError(err);
		}
	}

	async delete(id: UUID): Promise<string | ErrorData> {
		try {
			await this.repository.delete(id);

			return "User deleted succesfully.";

		} catch (err) {
			return this.handleError(err);
		}
	}

	handleError(err: any): ErrorData {
		if (err instanceof UniqueFieldError) {
			return ErrorSchema.parse({
				__typename: UniqueFieldError.name,
				message: err.message,
				payload: [{
					path: err.getFields
				}]
			});

		} else if (err instanceof InvalidFieldError) {
			return ErrorSchema.parse({
				__typename: InvalidFieldError.name,
				message: err.message
			})
		} else if (err instanceof ZodError) {
			return ErrorSchema.parse({
				__typename: 'ValidationError',
				message: 'Invalid field inserted',
				payload: err.issues
			})
		} else if (err instanceof NotFoundError) {
			return ErrorSchema.parse({
				__typename: NotFoundError.name,
				message: err.message,
			})
		} else {
			return ErrorSchema.parse({
				__typename: UnknownError.name,
				message: `Unknown error: ${err}`
			})
		}
	}
}
