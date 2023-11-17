import gql from 'graphql-tag';

export const chapter = gql`
	type Chapter {
		id: ID!
		author: Author!
		title: String!
		pages: [Page]
		createdAt: Float!
		updatedAt: Float!
	}

	type Chapters {
		chapters: [Chapter]
	}
`;
