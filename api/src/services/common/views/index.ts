import gql from 'graphql-tag';

export const commonTypeDef = gql`
	interface BaseError {
		message: String!
	}

	type NotFoundError implements BaseError {
		message: String!
	}

	type UnknownError implements BaseError {
		message: String!
	}

	type InvalidFieldError implements BaseError {
		message: String!
	}

	type UniqueFieldError implements BaseError {
		message: String!
		payload: [Payload]
	}

	type Payload {
		code: String
		message: String
		path: [String]
	}

	type ValidationError implements BaseError {
		message: String!
		payload: [Payload]
	}
`;
