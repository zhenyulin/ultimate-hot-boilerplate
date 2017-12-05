import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory/lib';

export default function setupApollo() {
  return new ApolloClient({
    link: new HttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache(),
  });
}
