import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const baseSchema: DocumentNode = gql`
	type Query {
		getDeck(id: ID!): DeckResult!
		getDecks: DeckResults!
		findDecks(by: DeckFilter!): DeckResults!

		getCard(id: ID!): CardResult!
		getCards: CardResults!
		findCards(by: CardFilter!): CardResults!

		getAnswer(id: ID!): AnswerResult!
		getAnswers: AnswerResults!
		findAnswers(by: AnswerFilter!): AnswerResults!
	}

	type Mutation {
		createDeck(data: DeckCreate!): DeckResult!
		updateDeck(id: ID!, data: DeckUpdate): DeckResult!
		deleteDeck(id: ID!): String

		createCard(data: CardCreate!): CardResult!
		updateCard(id: ID!, data: CardUpdate): CardResult!
		deleteCard(id: ID!): String

		createAnswer(data: AnswerCreate!): AnswerResult!
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;
