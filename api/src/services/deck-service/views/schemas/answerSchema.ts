import gql from 'graphql-tag';

export const answerSchema = gql`
	type Answer {
		externalId: ID!
		cardId: ID
		answeredById: ID
		difficulty: String!
		answeredAt: DateTimeISO!
		answerAgainAt: DateTimeISO!
	}

	type Answers implements Responses {
		offset: Int!
		pages: Int!
		currentPage: Int!
		objects: [Answer]
	}

	input AnswerCreate {
		cardId: ID!
		answeredById: ID!
		difficulty: String!
	}

	input AnswerOptional {
		cardId: ID
		answeredById: ID
		difficulty: String
	}

	union AnswerResponse = Answer | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError

	union AnswerResponses =
		  Answers
		| UniqueFieldError
		| InvalidFieldError
		| ValidationError
		| NotFoundError
		| UnknownError
`;
