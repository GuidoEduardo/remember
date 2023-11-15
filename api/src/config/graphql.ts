
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = [];
const resolvers = [];

const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
});

export const graphqlServer = createYoga({});