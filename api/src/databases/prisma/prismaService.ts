import { PrismaClient } from '@prisma/client';
import { UserRepositoryImpl } from './repositories-impl/user-service/userRepositoryImpl';

const client = new PrismaClient();

const repositories = {
	userRepository: new UserRepositoryImpl(client),
};

export { repositories };
