import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache, from } from '@apollo/client/core';


const addTokenLink = new ApolloLink((operation, forward) => {
  var token = localStorage.getItem('token');
  if(token) operation.setContext({ headers: { authorization: "Bearer " + token } });
  return forward(operation);
});

const uri = 'https://expense-tracker-backend-api.netlify.app/graphql'; // <-- add the URL of the GraphQL server here
function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: from([addTokenLink, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
