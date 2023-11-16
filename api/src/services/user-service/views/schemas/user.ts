import gql from "graphql-tag";

export const user = gql`
	type User {
		id:        ID!
		username:  String!
		email: 	   String!
		firstName: String!
		lastName:  String!
		createdAt  Float!
		updatedAt  Float!
	}

	type Users {
		users: [User]
	}

	input CreateUser {
		username:  String!
		email:	   String!
		firstName: String!
		lastName:  String!
	}

	union UserResult =
		User
		| Users
`;
