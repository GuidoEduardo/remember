import gql from 'graphql-tag';

export const answerSchema = gql`
	type Answer {
		externalId:    ID!
		cardId: 	   ID
		answeredById:  ID
		difficulty:    String!
		answeredAt:    DateTimeISO!
		answerAgainAt: DateTimeISO!
	}

	type Answers {
		objects: [Answer]
	}

	input AnswerCreate {
		cardId: 	   ID!
		answeredById:  ID!
		difficulty:    String!
	}

	input AnswerFilter {
		cardId: 	   ID
		answeredById:  ID
		difficulty:    String
	}

	union AnswerResult = Answer | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError

	union AnswerResults = Answers | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
`;
