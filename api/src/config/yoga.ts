import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { commonTypeDef } from '../services/common/views';
import { UserServiceResolver, UserServiceTypeDefs } from '../services/user-service/views';
import { DeckServiceResolver, DeckServiceTypeDefs } from '../services/deck-service/views';
import { DocumentNode } from 'graphql';
import { GraphQlResolver } from '../@types/graphql';
import { DateTimeISOTypeDefinition } from 'graphql-scalars';

const resolvers: GraphQlResolver[] = [
	UserServiceResolver,
	DeckServiceResolver
];

const typeDefs: (DocumentNode | string)[] = [
	...UserServiceTypeDefs,
	...DeckServiceTypeDefs,
	DateTimeISOTypeDefinition,
	commonTypeDef,
];

const schema = makeExecutableSchema({
	resolvers,
	typeDefs,
});

const yogaServer = createYoga({
	schema,
});

export { yogaServer };
