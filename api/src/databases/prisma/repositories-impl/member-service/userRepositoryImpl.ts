import { PrismaClient } from '@prisma/client';
import { User } from "../../../../services/user-service/entities/user";
import { UserRepository } from "../../../../services/user-service/repositories/userRepository";
import { UserId } from '../../../../services/user-service/value-objects/userId';
import { Name } from '../../../../services/user-service/value-objects/name';

export class UserRepositoryImpl implements UserRepository {
	private client: PrismaClient;

	constructor(client: PrismaClient) {
		this.client = client;
	}

	async create(user: User): Promise<User> {
		await this.client.user.create({
			data: user.data,
		});

		return user;
	}

	async get(externalId: UUID): Promise<User | null> {
		const userData = await this.client.user.findUnique({
			where: { externalId: externalId }
		})

		if (!userData) {
			return null;
		}

		return User.newBuilder()
			.setId(new UserId(userData.externalId))
			.setUsername(userData.username)
			.setEmail(userData.email)
			.setName(new Name(userData.firstName, userData.lastName))
			.build();
	}

	async find(filter: object): Promise<User[]> {
		let users: User[] = [];

		const usersData = await this.client.user.findMany({
			where: filter
		});

		usersData.forEach(userData => {
			users.push(User.newBuilder()
				.setId(new UserId(userData.externalId))
				.setUsername(userData.username)
				.setEmail(userData.email)
				.setName(new Name(userData.firstName, userData.lastName))
				.build()
			);
		});

		return users;
	}

	async delete(externalId: UUID): Promise<boolean> {
		await this.client.user.delete({
			where: { externalId }
		});

		return true;
	}
}
