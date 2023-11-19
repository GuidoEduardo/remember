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

	type Users implements Responses {
		offset: Int!
		pages: Int!
		currentPage: Int!
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

	union UserResponse = User | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError

	union UserResponses = Users | UniqueFieldError | InvalidFieldError | ValidationError | NotFoundError | UnknownError
`;
