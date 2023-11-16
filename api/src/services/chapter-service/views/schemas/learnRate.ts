import gql from 'graphql-tag';

export const learnRate = gql`
	type LearnRate {
		id:	ID!
		pageId: ID!
		level: String!
		answeredAt: Float!
		answerAgainAt: Float!
		createdAt: Float!
		updatedAt: Float!
	}
`;
