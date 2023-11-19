import { GraphQlResolver } from '../../../@types/graphql';
import { UserServiceTypeDefs } from './schemas';
import { DateTimeISOResolver } from 'graphql-scalars';
import { userQueries, userMutations } from './resolvers/user';

const UserServiceResolver: GraphQlResolver = {
	DateTimeISO: DateTimeISOResolver,

	Query: {
		...userQueries,
	},
	Mutation: {
		...userMutations,
	},
};

export { UserServiceResolver, UserServiceTypeDefs };
