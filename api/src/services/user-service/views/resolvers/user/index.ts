import { User } from "../../../entities/user";

export const userResolver = {
	Query: {
		getUser: (_: unknown, request: UUID) => 'hello',
	},
	Mutation: {
		createUser: (_: unknown, request: { user: CreateUser }) => 'hello'
	}
};
