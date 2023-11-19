import { ResultOrError, ResultsOrError } from '../../common/@types/graphql';
import { User, Users } from './user';

type UserOrError = ResultOrError<User>;
type UsersOrError = ResultsOrError<User>;

export { UserOrError, UsersOrError };
