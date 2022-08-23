## To Do

* Add Virtualization to long lists (Customers & Opportunites)
* Setup code generation for GraphQL Types
* Cache merging


## Getting Started
* Add grapQL end point to `libs/apollo.ts`
```js
const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: '<GraphQL end point>',
});
```
* run `npm run start`
