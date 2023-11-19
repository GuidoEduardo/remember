import gql from 'graphql-tag';

export const deckSchema = gql`
	type Deck {
		externalId: ID!
		ownerId:    ID
		title:      String!
		cards:      [Card]
		createdAt:  DateTimeISO!
		updatedAt:  DateTimeISO!
	}

	type Decks {
		objects: [Deck]
	}

	input DeckCreate {
		title: String!
	}

	input DeckFilter {
		ownerId: ID
		title: 	 String
	}

	input DeckUpdate {
		title: 	 String
	}

	union DeckResult = Deck | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError

	union DeckResults = Decks | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
`;
