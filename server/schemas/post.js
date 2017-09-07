import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Post from 'server/models/post';

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
        const posts = await Post.find(args);
        return posts;
      },
    },
  }),
});

const PostMutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    add: {
      type: PostType,
      args: {
        title: {
          name: 'title',
          type: GraphQLString,
        },
        body: {
          name: 'body',
          type: GraphQLString,
        },
      },
      resolve: async (root, args) => {
        const post = new Post(args);
        return post.save();
      },
    },
  }),
});

const PostSchema = new GraphQLSchema({
  query: PostQuery,
  mutation: PostMutation,
});

export default PostSchema;
