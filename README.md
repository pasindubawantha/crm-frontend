This app is hosted at This app is hosted at [http://13.215.83.42/ 🚀](http://13.215.83.42/)  

## To Do

* Add Virtualization to long lists (Customers & Opportunites)
* Setup code generation for GraphQL Types

## Getting Started
* Add grapQL end point to `libs/apollo.ts`
```js
const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: '<GraphQL end point>',
});
```
* run `npm run build`
* run `npm run start`
