import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const baseSchema: DocumentNode = gql`
	input Request {
		offset: Int
		currentPage: Int
	}

	interface Responses {
		offset: Int!
		pages: Int!
		currentPage: Int!
	}

	type Query {
		getUser(id: ID!): UserResponse!
		getUsers(options: Request): UserResponses!
		findUsers(options: Request, by: UserOptional!): UserResponses!
	}

	type Mutation {
		createUser(data: UserCreate!): UserResponse!
		updateUser(id: ID!, data: UserOptional): UserResponse!
		deleteUser(id: ID!): String
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;
