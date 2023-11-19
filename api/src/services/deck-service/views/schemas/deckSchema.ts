import gql from 'graphql-tag';

export const deckSchema = gql`
	type Deck {
		externalId: ID!
		ownerId: ID
		title: String!
		cards: [CardWithoutAnswers]
		createdAt: DateTimeISO!
		updatedAt: DateTimeISO!
	}

	type Decks implements Responses {
		offset: Int!
		pages: Int!
		currentPage: Int!
		objects: [Deck]
	}

	input DeckCreate {
		ownerId: ID!
		title: String!
	}

	input DeckOptional {
		ownerId: ID
		title: String
	}

	input DeckUpdate {
		title: String
	}

	union DeckResponse = Deck | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError

	union DeckResponses = Decks | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
`;
