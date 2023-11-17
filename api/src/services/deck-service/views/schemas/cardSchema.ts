import gql from 'graphql-tag';

export const cardSchema = gql`
	type Card {
		externalId: ID!
		ownerId: ID!
		contentFront: String!
		contentBack: String!
		createdAt: DateTimeISO!
		updatedAt: DateTimeISO!
	}

	type Cards {
		cards: [Card]
	}

	input CardCreate {
		contentFront: String!
		contentBack: String!
	}

	input CardFilter {
		ownerId: ID
		contentFront: String
		contentBack: String
	}

	union CardResult = Card | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError

	union DeckResults = Cards | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
`;
