import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const main: DocumentNode = gql`
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

	type Query {
		getUser(id: ID!): UserResult!
		getUsers: UserResults!
		findUser(by: UserFilter!): UserResults!
	}

	type Mutation {
		createUser(data: UserCreate!): UserResult!
		updateUser(id: ID!, data: UserFilter): UserResult!
		deleteUser(id: ID!): String
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;
