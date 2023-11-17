import { EntityOrError, EntitiesOrError } from '../../common/@types/graphql';
import { User, Users } from './user';

type UserOrError = EntityOrError<User>;
type UsersOrError = EntitiesOrError<User>;

export { UserOrError, UsersOrError };
