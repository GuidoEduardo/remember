import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const baseSchema: DocumentNode = gql`
	type Query {
		getUser(id: ID!): UserResult!
		getUsers: UserResults!
		findUsers(by: UserOptional!): UserResults!
	}

	type Mutation {
		createUser(data: UserCreate!): UserResult!
		updateUser(id: ID!, data: UserOptional): UserResult!
		deleteUser(id: ID!): String
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;
