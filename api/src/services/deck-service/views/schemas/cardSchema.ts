import gql from 'graphql-tag';

export const cardSchema = gql`
	type Card {
		externalId:   ID!
		deckId: 	  ID
		contentFront: String!
		contentBack:  String!
		answers: 	  [Answer]
		createdAt: 	  DateTimeISO!
		updatedAt: 	  DateTimeISO!
	}

	type Cards {
		objects: [Card]
	}

	input CardCreate {
		deckId:		  ID!
		contentFront: String!
		contentBack:  String!
	}

	input CardFilter {
		deckId: 	  ID
		contentFront: String
		contentBack:  String
	}

	input CardUpdate {
		contentFront: String
		contentBack:  String
	}

	union CardResult = Card | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
	union CardResults = Cards | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
`;
