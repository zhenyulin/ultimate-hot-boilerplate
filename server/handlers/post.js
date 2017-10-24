import graphqlEndpoint from 'express-graphql';
import { buildSchema } from 'graphql';

import Post from 'server/models/post';
import Comment from 'server/models/comment';

const schema = buildSchema(`
  type Author {
    _id: ID!,
    name: String,
    email: String!,
  }

  input AuthorInput {
    name: String,
    email: String!
  }

  type Comment {
    _id: ID!,
    content: String,
    author: String
  }

  input CommentInput {
    content: String,
    author: String,
  }

  type Post {
    _id: ID!,
    title: String,
    body: String,
    comments: [Comment]
  }

  input PostInput {
    title: String,
    body: String,
  }

  type Query {
    posts(_id: ID): [Post],
  }

  type Mutation {
    createPost(title: String!, body: String!): Post,
    updatePost(_id: ID!, input: PostInput): Post,
    deletePost(_id: ID!): Post,
    addComment(_id: ID!, input: CommentInput): Post,
  }
`);

const resolvers = {
  posts: async query => {
    const posts = await Post.find(query).populate('comments');
    return posts;
  },
  createPost: data => {
    const post = new Post(data);
    return post.save();
  },
  updatePost: async ({ _id, input }) => {
    try {
      const post = await Post.findByIdAndUpdate(_id, input, { new: true });
      return post;
    } catch (err) {
      return err;
    }
  },
  deletePost: async _id => {
    try {
      const post = await Post.findByIdAndRemove(_id);
      return post;
    } catch (err) {
      return err;
    }
  },
  addComment: async ({ _id, input }) => {
    try {
      const post = await Post.findById(_id);
      const comment = await Comment.create(input);
      post.comments.push(comment._id);
      await post.save();
      const updated = await Post.populate(post, { path: 'comments' });
      return updated;
    } catch (err) {
      return err;
    }
  },
};

export default graphqlEndpoint({
  schema,
  rootValue: resolvers,
  graphiql: true,
});
