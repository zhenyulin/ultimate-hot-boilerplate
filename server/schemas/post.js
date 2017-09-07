import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import POST from 'server/models/post';

const PostType = new GraphQLObjectType({
  name: 'post',
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
  }),
});

const PostQuery = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      args: {
        title: {
          name: 'title',
          type: GraphQLString,
        },
        _id: {
          name: '_id',
          type: GraphQLID,
        },
      },
      resolve: async (root, args) => {
        const posts = await POST.find(args);
        return posts;
      },
    },
  }),
});

const PostSchema = new GraphQLSchema({
  query: PostQuery,
});

export default PostSchema;
