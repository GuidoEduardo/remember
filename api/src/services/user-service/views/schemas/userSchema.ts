import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const userSchema: DocumentNode = gql`
	type User {
		externalId: ID!
		username: String!
		email: String!
		firstName: String!
		lastName: String!
		createdAt: DateTimeISO!
		updatedAt: DateTimeISO!
	}

	type Users {
		objects: [User]
	}

	input UserCreate {
		username: String!
		email: String!
		firstName: String!
		lastName: String!
	}

	input UserOptional {
		username: String
		email: String
		firstName: String
		lastName: String
	}

	union UserResult = User | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError

	union UserResults = Users | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
`;
