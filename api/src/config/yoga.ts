import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { commonTypeDef } from '../services/common/views';
import { userServiceResolver, UserServiceTypeDefs } from '../services/user-service/views';
import { DocumentNode } from 'graphql';
import { GraphQlResolver } from '../@types/graphql';
import { DateTimeISOTypeDefinition } from 'graphql-scalars';
import { DeckServiceTypeDefs } from '../services/deck-service/views/schemas';

const resolvers: GraphQlResolver[] = [userServiceResolver];

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
