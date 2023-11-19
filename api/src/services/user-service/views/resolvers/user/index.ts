import { UserCreate, UserOptional } from '../../../@types/user';
import { controllers } from '../../../controllers';
import { UserMutator } from './mutation';
import { UserQuery } from './query';

const userQuery = new UserQuery(controllers.userController);
const userMutator = new UserMutator(controllers.userController);

const userQueries = {
	getUser: (_: unknown, request: { id: UUID }) => userQuery.getUser(request),
	getUsers: (_: unknown) => userQuery.getUsers(),
	findUsers: (_: unknown, request: { by: UserOptional }) => userQuery.findUsers(request),
};

const userMutations = {
	createUser: (_: unknown, request: { data: UserCreate }) => userMutator.createUser(request),
	updateUser: (_: unknown, request: { id: UUID; data: UserOptional }) => userMutator.updateUser(request),
	deleteUser: (_: unknown, request: { id: UUID }) => userMutator.deleteUser(request),
};

export { userQueries, userMutations };
