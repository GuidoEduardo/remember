import gql from 'graphql-tag';

export const author = gql`
	type Author {
		id:	ID!
		username: String!
		email: String!
		firstName: String!
		lastName: String!
	}

	type Authors {
		authors: [Author]
	}
`;
