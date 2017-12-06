import graphqlEndpoint from 'express-graphql';
import { buildSchema } from 'graphql';

import Post from 'server/models/post';
import Comment from 'server/models/comment';
import Author from 'server/models/author';

const schema = buildSchema(`
  type Author {
    _id: ID!,
    name: String,
    email: String!,
  }

  input AuthorInput {
    name: String,
    email: String!,
  }

  type Comment {
    _id: ID!,
    content: String,
    author: Author,
  }

  input CommentInput {
    content: String,
    author: AuthorInput,
  }

  type Post {
    _id: ID!,
    title: String,
    body: String,
    comments: [Comment],
  }

  input PostInput {
    title: String,
    body: String,
  }

  type Query {
    posts(_id: ID): [Post],
    comments(_id: ID): [Comment],
    authors(_id: ID): [Author],
  }

  type Mutation {
    createPost(title: String!, body: String!): Post,
    updatePost(_id: ID!, input: PostInput): Post,
    deletePost(_id: ID!): Post,
    addComment(_id: ID!, input: CommentInput): Post,
    deleteComment(id: ID!, cid: ID!): Post,
  }
`);

const resolvers = {
  posts: async query => {
    const posts = await Post.find(query).populate({
      path: 'comments',
      populate: {
        path: 'author',
      },
    });
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
      const author = await Author.findOneOrCreate(
        { email: input.author.email },
        input.author,
      );
      const inputWithPopulatedAuthor = { ...input, author };
      const comment = await Comment.create(inputWithPopulatedAuthor);
      post.comments.push(comment._id);
      await post.save();
      const updated = await Post.populate(post, {
        path: 'comments',
        populate: {
          path: 'author',
        },
      });
      return updated;
    } catch (err) {
      return err;
    }
  },
  deleteComment: async ({ id, cid }) => {
    try {
      await Comment.findByIdAndRemove(cid);
      const post = await Post.findByIdAndUpdate(
        id,
        { $pull: { comments: cid } },
        { new: true },
      );
      const updated = await Post.populate(post, {
        path: 'comments',
        populate: {
          path: 'author',
        },
      });
      return updated;
    } catch (e) {
      return e;
    }
  },
};

export default graphqlEndpoint({
  schema,
  rootValue: resolvers,
  graphiql: true,
});
