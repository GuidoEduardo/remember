import gql from 'graphql-tag';

export const cardSchema = gql`
	type Card {
		externalId: ID!
		deckId: ID
		contentFront: String!
		contentBack: String!
		answers: [Answer]
		createdAt: DateTimeISO!
		updatedAt: DateTimeISO!
	}

	type Cards implements Responses {
		offset: Int!
		pages: Int!
		currentPage: Int!
		objects: [Card]
	}

	type CardWithoutAnswers {
		externalId: ID!
		contentFront: String!
		contentBack: String!
		createdAt: DateTimeISO!
		updatedAt: DateTimeISO!
	}

	input CardCreate {
		deckId: ID!
		contentFront: String!
		contentBack: String!
	}

	input CardOptional {
		deckId: ID
		contentFront: String
		contentBack: String
	}

	input CardUpdate {
		contentFront: String
		contentBack: String
	}

	union CardResponse = Card | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
	union CardResponses = Cards | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
`;
