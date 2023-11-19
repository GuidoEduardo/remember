import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const baseSchema: DocumentNode = gql`
	input Request {
		offset: Int
		currentPage: Int
	}

	interface Responses {
		offset: Int!
		pages: Int!
		currentPage: Int!
	}

	type Query {
		getDeck(id: ID!): DeckResponse!
		getDecks(options: Request): DeckResponses!
		findDecks(options: Request, by: DeckOptional!): DeckResponses!

		getCard(id: ID!): CardResponse!
		getCards(options: Request): CardResponses!
		findCards(options: Request, by: CardOptional!): CardResponses!

		getAnswer(id: ID!): AnswerResponse!
		getAnswers(options: Request): AnswerResponses!
		findAnswers(options: Request, by: AnswerOptional!): AnswerResponses!
	}

	type Mutation {
		createDeck(data: DeckCreate!): DeckResponse!
		updateDeck(id: ID!, data: DeckUpdate): DeckResponse!
		deleteDeck(id: ID!): String

		createCard(data: CardCreate!): CardResponse!
		updateCard(id: ID!, data: CardUpdate): CardResponse!
		deleteCard(id: ID!): String

		createAnswer(data: AnswerCreate!): AnswerResponse!
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;
