import gql from 'graphql-tag';

export const page = gql`
	type Page {
		id: ID!
		author: Author!
		chapterId: ID!
		contentFront: String!
		contentBack: String!
		learnRate: LearnRate!
		createdAt: Float!
		updatedAt: Float!
	}

	type Pages {
		pages: [Page]
	}
`;
