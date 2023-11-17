import { UserCreate, UserFilter } from '../../../@types/user.schema';
import { controllers } from '../../../controllers';
import { UserMutator } from './mutation';
import { UserQuery } from './query';

const userQuery = new UserQuery(controllers.userController);
const userMutator = new UserMutator(controllers.userController);

const userQueries = {
	getUser: (_: unknown, request: { id: UUID }) => userQuery.getUser(request),
	getUsers: (_: unknown) => userQuery.getUsers(),
	findUser: (_: unknown, request: { by: UserFilter }) => userQuery.findUser(request)
};

const userMutations = {
	createUser: (_: unknown, request: { data: UserCreate }) => userMutator.createUser(request),
	updateUser: (_: unknown, request: { id: UUID, data: UserFilter }) => userMutator.updateUser(request),
	deleteUser: (_: unknown, request: { id: UUID }) => userMutator.deleteUser(request)
};

export { userQueries, userMutations };