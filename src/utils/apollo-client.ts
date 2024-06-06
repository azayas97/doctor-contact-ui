import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
    if (networkError) console.log(`[Network error]: ${networkError}`); 
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});

export default client;
