**This application is deployed at [http://13.215.83.42/ 🚀](http://13.215.83.42/)**

## Installation
* Install dependencies. Run `npm install`. 
* Change graphql endpoint to your [crm-backend](https://github.com/pasindubawantha/crm-backend) deployment in file `./libs/apollo.ts`
```js
const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: '<crm-backend GraphQL endpoint>',
});
```

* Run `npm run build`
* Run `npm run start`
* Application will be deployed at [http://localhost:3000/](http://localhost:3000/)



## Requirements
* [Node.js](https://nodejs.org/en/) - version: v16.17.0 (to run [Next.js](https://nextjs.org/))
* [crm-backend](https://github.com/pasindubawantha/crm-backend) - can be downloaded form this  [link 🔗](https://github.com/pasindubawantha/crm-backend)


## To Do

* Add Virtualization to long lists (Customers & Opportunites)
* Setup code generation for GraphQL Types
