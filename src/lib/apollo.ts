import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4vrkiwn1sbt01uncioj6wua/master',
    cache: new InMemoryCache()
});