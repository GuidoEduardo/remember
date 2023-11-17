import gql from 'graphql-tag';

export const cardContextSchema = gql`
	type CardContext {
		externalId: ID!
		deckId: ID!
		cardId: ID!
		answeredById: ID!
		difficulty: String!
		answeredAt: DateTimeISO!
		answerAgainAt: DateTimeISO!
		createdAt: DateTimeISO!
		updatedAt: DateTimeISO!
	}

	type CardContexts {
		contexts: [CardContexts]
	}
`;
