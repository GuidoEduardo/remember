import { Prisma, PrismaClient } from '@prisma/client';
import { UserRepository } from '../../../../services/user-service/repositories/userRepository';
import { UserCreate, UserData, UserFilter, UsersData } from '../../../../services/user-service/@types/user.schema';
import { InvalidFieldError, NotFoundError, UniqueFieldError, UnknownError } from '../../../../services/common/exceptions';
import { isValidUUID } from '../../../../services/common/utils/stringUtilities';

export class UserRepositoryImpl implements UserRepository {
	private client: PrismaClient;

	constructor(client: PrismaClient) {
		this.client = client;
	}

	handleDatabaseError(err: any): Error {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			return new UniqueFieldError(
				(err.meta as Record<string, string[]>).target,
				"Unique constraint failed on the fields"
			);
		} else if (err instanceof Prisma.PrismaClientValidationError) {
			return new InvalidFieldError(`Invalid fields inserted: ${err}`);
		} else {
			return new UnknownError(`Unknown error: ${err.message}`);
		}
	}

	async create(user: UserCreate): Promise<UserData> {
		if (!user) {
			throw new InvalidFieldError('The requested creation object can not be null');
		}

		try {
			const createdUser = await this.client.user.create({
				data: {
					externalId: user.externalId!,
					...user
				},
			});

			console.log('User created succesfully ', createdUser);

			return createdUser;

		} catch (err) {
			console.log('User creation failed ', err)
			throw this.handleDatabaseError(err);
		}
	}

	async get(externalId: UUID): Promise<UserData | null> {
		if (!isValidUUID(externalId)) throw new NotFoundError();

		const user = await this.client.user.findUnique({
			where: { externalId },
		});

		if (!user) {
			throw new NotFoundError();
		}

		return user;
	}

	async getAll(): Promise<UsersData> {
		const users = await this.client.user.findMany();

		return users;
	}

	async find(filter: UserFilter): Promise<UsersData> {
		if (!filter) return [];

		const users = await this.client.user.findMany({
			where: filter,
		});

		return users || [];
	}

	async update(externalId: UUID, data: UserFilter): Promise<UserData> {
		if (!isValidUUID(externalId)) throw new NotFoundError();

		try {
			const user = await this.client.user.update({
				where: {
					externalId
				},
				data
			});

			return user;
		} catch(err) {
			throw this.handleDatabaseError(err);
		}
	}

	async delete(externalId: UUID): Promise<void> {
		if (!isValidUUID(externalId)) throw new NotFoundError();

		try {
			await this.client.user.delete({
				where: { externalId },
			});

		} catch(err) {
			this.handleDatabaseError(err);
		}
	}
}
