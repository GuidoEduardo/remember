import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { userServiceResolver, UserServiceTypeDefs } from '../services/user-service/views';
import { DocumentNode } from 'graphql';
import { GraphQlResolver } from '../@types/graphql';
import { DateTimeISOTypeDefinition } from 'graphql-scalars';

const resolvers: GraphQlResolver[] = [
	userServiceResolver
];

const typeDefs: (DocumentNode | string)[] = [
	...UserServiceTypeDefs,
	DateTimeISOTypeDefinition
];

const schema = makeExecutableSchema({
	resolvers,
	typeDefs
});

const yogaServer = createYoga({
	schema
});

export { yogaServer };
