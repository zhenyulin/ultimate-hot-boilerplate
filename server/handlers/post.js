import graphql from 'express-graphql';

import PostSchema from 'server/schemas/post';

const router = graphql({
  schema: PostSchema,
  graphiql: true,
});

export default router;
