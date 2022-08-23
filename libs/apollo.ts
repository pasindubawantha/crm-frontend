import {
  ApolloClient,
  NormalizedCacheObject
} from '@apollo/client';
import { cache } from './cache';

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/',
});


export default apolloClient
