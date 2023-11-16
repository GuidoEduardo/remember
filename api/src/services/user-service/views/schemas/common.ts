import gql from 'graphql-tag';

export const common = gql`
	type Query {
		getUser(id: ID!): UserResult!
	}

	type Mutation {
		createUser(user: CreateUser!): UserResult!
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;
