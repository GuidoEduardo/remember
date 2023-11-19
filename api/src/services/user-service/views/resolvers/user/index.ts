import { UserCreate, UserOptional } from '../../../@types/user';
import { controllers } from '../../../controllers';
import { UserMutator } from './mutation';
import { UserSearcher } from './query';

const userSearcher = new UserSearcher(controllers.userController);
const userMutator = new UserMutator(controllers.userController);

const userQueries = {
	getUser: (_: unknown, request: { id: UUID }) => userSearcher.get(request),
	getUsers: (_: unknown) => userSearcher.getAll(),
	findUsers: (_: unknown, request: { by: UserOptional }) => userSearcher.find(request),
};

const userMutations = {
	createUser: (_: unknown, request: { data: UserCreate }) => userMutator.create(request),
	updateUser: (_: unknown, request: { id: UUID; data: UserOptional }) => userMutator.update(request),
	deleteUser: (_: unknown, request: { id: UUID }) => userMutator.delete(request),
};

export { userQueries, userMutations };
