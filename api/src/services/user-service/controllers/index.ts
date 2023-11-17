import { repositories } from '../../../databases/prisma/prismaService';
import { UserController } from './userController';

export const controllers = {
	userController: new UserController(repositories.userRepository),
};
