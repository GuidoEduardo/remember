import { createYoga } from "graphql-yoga";
import { createSchema } from "graphql-yoga";

const schema = createSchema({
	typeDefs: `
		type Query {
			hello: String
		}
	`,
	resolvers: {
		Query: {
			hello: () => "world"
		}
	}
});

const yogaServer = createYoga({ schema })

export { yogaServer };
