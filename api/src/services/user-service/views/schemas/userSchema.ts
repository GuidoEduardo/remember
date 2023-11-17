import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const user: DocumentNode = gql`
	type User {
		externalId: ID!
		username:   String!
		email: 	    String!
		firstName:  String!
		lastName:   String!
		createdAt: 	DateTimeISO!
		updatedAt:  DateTimeISO!
	}

	type Users {
		users: [User]
	}

	input UserCreate {
		username:  String!
		email:	   String!
		firstName: String!
		lastName:  String!
	}

	input UserFilter {
		username:   String
		email: 	    String
		firstName:  String
		lastName:   String
	}

	union UserResult =
		  User
		| UniqueFieldError
		| InvalidFieldError
		| ValidationError
		| NotFoundError
		| UnknownError

	union UserResults =
	  	Users
	  | UniqueFieldError
	  | InvalidFieldError
	  | ValidationError
	  | NotFoundError
	  | UnknownError
`;
