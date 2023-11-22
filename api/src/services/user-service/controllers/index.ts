import { repositories } from '../../../databases/prisma/repositories';
import { UserController } from './userController';

export const controllers = {
	userController: new UserController(repositories.userRepository),
};
