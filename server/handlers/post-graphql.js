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
    commented: [ID!],
  }

  input AuthorInput {
    name: String,
    email: String!,
  }

  type Comment {
    _id: ID!,
    content: String,
    author: Author,
    posted: ID!,
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
    deleteAuthor(_id: ID!): Author,
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
  comments: async query => {
    const comments = await Comment.find(query).populate('author');
    return comments;
  },
  authors: async query => {
    const authors = await Author.find(query);
    return authors;
  },
  createPost: async data => {
    const post = await Post.create(data);
    return post;
  },
  updatePost: async ({ _id, input }) => {
    try {
      const post = await Post.findByIdAndUpdate(_id, input, { new: true });
      return post;
    } catch (err) {
      return err;
    }
  },
  deletePost: async ({ _id }) => {
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
      const inputWithPopulatedAuthor = { ...input, author, posted: _id };
      const comment = await Comment.create(inputWithPopulatedAuthor);
      post.comments.push(comment._id);
      author.commented.push(comment._id);
      await Promise.all([post.save(), author.save()]);
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
  deleteAuthor: async ({ _id }) => {
    try {
      const author = await Author.findByIdAndRemove(_id);
      const { commented } = author;
      const comments = await Comment.find({ _id: { $in: commented } });
      const commentsPosted = comments.map(comment => comment.posted);
      await Post.update(
        {
          _id: { $in: commentsPosted },
        },
        {
          $pull: { comments: { $in: commented } },
        },
        {
          multi: true,
          new: true,
        },
      );
      await Comment.remove({ _id: { $in: commented } });
      return author;
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
