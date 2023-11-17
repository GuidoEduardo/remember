type GraphQlResolver = {
	DateTimeISO?: GraphQLScalarType<Date, string>;
	Query: Record<string, Function>;
	Mutation: Record<string, Function>;
};

type GraphQlTypename = {
	__typename: string;
};

export { GraphQlResolver, GraphQlTypename };
