import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const baseSchema: DocumentNode = gql`
	schema {
		query: Query
		mutation: Mutation
	}
`;
