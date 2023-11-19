import { GraphQlResolver } from '../../../@types/graphql';
import { DeckServiceTypeDefs } from './schemas';
import { DateTimeISOResolver } from 'graphql-scalars';
import { deckQueries, deckMutations } from './resolvers/deck';
import { cardQueries, cardMutations } from './resolvers/card';
import { answerQueries, answerMutations } from './resolvers/answer';

const DeckServiceResolver: GraphQlResolver = {
	DateTimeISO: DateTimeISOResolver,

	Query: {
		...deckQueries,
		...cardQueries,
		...answerQueries
	},
	Mutation: {
		...deckMutations,
		...cardMutations,
		...answerMutations
	},
};

export { DeckServiceResolver, DeckServiceTypeDefs };
