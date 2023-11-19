import { UserRepository } from '../../../../services/user-service/repositories/userRepository';
import { User, UserOptional, Users } from '../../../../services/user-service/@types/user';
import { InvalidFieldError, NotFoundError } from '../../../../services/common/exceptions';
import { isValidUUID } from '../../../../services/common/utils/stringUtilities';
import { MutableRepositoryImpl } from '../common/mutableRepositoryImpl';
import { PrismaClient } from '@prisma/client';
import { Request } from '../../../../services/common/@types/graphql';
import { GenericResults } from '../../../../services/common/@types/repository';

export class UserRepositoryImpl extends MutableRepositoryImpl<User> implements UserRepository {
	constructor(client: PrismaClient) {
		super();
		this.client = client;
	}

	@UserRepositoryImpl.handleError
	async create(data: User): Promise<User> {
		if (!data) {
			throw new InvalidFieldError('The requested creation object can not be null');
		}

		const user = await this.client.user.create({
			data: {
				externalId: data.externalId!,
				username: data.username,
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
			},
		});

		return user;
	}

	@UserRepositoryImpl.handleError
	async createMany(data: Users): Promise<number> {
		if (!data) {
			throw new InvalidFieldError('The requested creation object can not be null');
		}

		const queries = data.map(
			(user) =>
				this.client.$executeRaw`INSERT INTO "User" (
				"externalId",
				"username",
				"email",
				"firstName",
				"lastName"
			)
			VALUES (
				${user.externalId}::UUID,
				${user.username},
				${user.email},
				${user.firstName},
				${user.lastName}
			)`,
		);

		return await this.batch(queries);
	}

	@UserRepositoryImpl.handleError
	async get(externalId: UUID): Promise<User | void> {
		if (!isValidUUID(externalId)) throw new NotFoundError('User not found');

		const user = await this.client.user.findUnique({
			where: { externalId },
		});

		if (!user) {
			throw new NotFoundError('User not found');
		}

		return user;
	}

	@UserRepositoryImpl.handleError
	async getAll(options: Request): Promise<GenericResults<User>> {
		const [pages, users] = await this.client.$transaction([
			this.client.user.count(),
			this.client.user.findMany({
				skip: options.currentPage * options.offset,
				take: options.offset,
				orderBy: {
					createdAt: 'desc',
				},
			}),
		]);

		return {
			objects: users,
			pages: Math.floor(pages / options.offset),
		};
	}

	@UserRepositoryImpl.handleError
	async find(options: Request, filter: UserOptional): Promise<GenericResults<User>> {
		if (!filter) return { objects: [], pages: 0 };

		const [pages, users] = await this.client.$transaction([
			this.client.user.count({
				where: filter,
			}),
			this.client.user.findMany({
				skip: options.currentPage * options.offset,
				take: options.offset,
				where: filter,
				orderBy: {
					createdAt: 'desc',
				},
			}),
		]);

		return {
			objects: users,
			pages: Math.floor(pages / options.offset),
		};
	}

	@UserRepositoryImpl.handleError
	async update(externalId: UUID, data: User): Promise<User> {
		if (!isValidUUID(externalId)) throw new NotFoundError('User not found');

		const user = await this.client.user.update({
			where: {
				externalId,
			},
			data,
		});

		return user;
	}

	@UserRepositoryImpl.handleError
	async delete(externalId: UUID): Promise<void> {
		if (!isValidUUID(externalId)) throw new NotFoundError('User not found');

		await this.client.user.delete({
			where: { externalId },
		});
	}
}
