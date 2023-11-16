import gql from 'graphql-tag';

export const common = gql`
	type Query {
		findChapter(): Chapters
	}
`;
