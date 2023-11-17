import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const baseSchema: DocumentNode = gql`
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
