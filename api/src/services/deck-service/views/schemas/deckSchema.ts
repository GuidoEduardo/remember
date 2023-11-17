import gql from 'graphql-tag';

export const deckSchema = gql`
	type Deck {
		externalId: ID!
		ownerId: ID!
		title: String!
		createdAt: DateTimeISO!
		updatedAt: DateTimeISO!
	}

	type Decks {
		decks: [Deck]
	}

	input DeckCreate {
		title: String!
	}

	input DeckFilter {
		ownerId: ID
		title: String
	}

	union DeckResult = Deck | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError

	union DeckResults = Decks | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
`;
