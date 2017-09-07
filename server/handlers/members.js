import graphqlRouter from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
  `);

const resolver = {
  hello: () => 'Hello World!',
};

const router = graphqlRouter({
  schema,
  rootValue: resolver,
  graphiql: true,
});

export default router;
