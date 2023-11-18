import { UserRepository } from '../../../../services/user-service/repositories/userRepository';
import { User, UserCreate, UserOptional, Users } from '../../../../services/user-service/@types/user';
import {
	InvalidFieldError,
	NotFoundError
} from '../../../../services/common/exceptions';
import { isValidUUID } from '../../../../services/common/utils/stringUtilities';
import { MutableRepositoryImpl } from '../common/mutableRepositoryImpl';

export class UserRepositoryImpl extends MutableRepositoryImpl<User> implements UserRepository {
	@UserRepositoryImpl.handleError
	async create(data: UserCreate): Promise<User> {
		if (!data) {
			throw new InvalidFieldError('The requested creation object can not be null');
		}

		const user = await this.client.user.create({
			data: {
				externalId: data.externalId!,
				...data,
			},
		});

		return user;
	}

	async get(externalId: UUID): Promise<User | void> {
		if (!isValidUUID(externalId)) throw new NotFoundError("User not found");

		const user = await this.client.user.findUnique({
			where: { externalId },
		});

		if (!user) {
			throw new NotFoundError("User not found");
		}

		return user;
	}

	@UserRepositoryImpl.handleError
	async getAll(): Promise<Users> {
		const users = await this.client.user.findMany();

		return users;
	}

	async find(filter: UserOptional): Promise<Users> {
		if (!filter) return [];

		const users = await this.client.user.findMany({
			where: filter,
		});

		return users || [];
	}

	async update(externalId: UUID, data: UserOptional): Promise<User> {
		if (!isValidUUID(externalId)) throw new NotFoundError("User not found");

		const user = await this.client.user.update({
			where: {
				externalId,
			},
			data,
		});

		return user;
	}

	async delete(externalId: UUID): Promise<void> {
		if (!isValidUUID(externalId)) throw new NotFoundError("User not found");

		await this.client.user.delete({
			where: { externalId },
		});
	}
}
