import express from 'express';

import Post from 'server/models/post';
import Comment from 'server/models/comment';
import Author from 'server/models/author';

const router = express.Router();

const findAll = model => async (req, res) => {
  try {
    const posts = await model.find();
    return res.send(posts);
  } catch (e) {
    return res.status(404).send(e);
  }
};

const basicCreate = model => async (req, res) => {
  try {
    const input = req.body;
    const post = await model.create(input);
    return res.status(201).send(post);
  } catch (e) {
    return res.status(409).send(e);
  }
};

const findById = (model, field = 'id') => async (req, res) => {
  try {
    const id = req.params[field];
    const item = await model.findById(id);
    return res.send(item);
  } catch (e) {
    return res.status(404).send(e);
  }
};

const updateById = (model, field = 'id') => async (req, res) => {
  try {
    const id = req.params[field];
    const update = req.body;
    const updated = await model.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    return res.send(updated);
  } catch (e) {
    return res.send(e);
  }
};

const deleteById = (model, field = 'id') => async (req, res) => {
  try {
    const id = req.params[field];
    const deleted = await model.findByIdAndRemove(id);
    return res.send(deleted);
  } catch (e) {
    return res.status(404).send(e);
  }
};

const createAuthor = async author => {
  try {
    const result = await Author.findOneOrCreate(
      { email: author.email },
      author,
    );
    return result;
  } catch (e) {
    return e;
  }
};

router
  .route('/posts')
  .get(findAll(Post))
  .post(basicCreate(Post));

router
  .route('/posts/:id')
  .get(findById(Post))
  .put(updateById(Post))
  .delete(deleteById(Post));

router
  .route('/posts/:id/comments')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      const { comments } = post;
      const result = await Comment.find({ _id: { $in: comments } });
      return res.send(result);
    } catch (e) {
      return res.send(e);
    }
  })
  .post(async (req, res) => {
    try {
      const { id } = req.params;
      const input = req.body;
      const post = await Post.findById(id);
      const author = await Author.findOneOrCreate(
        { email: input.author.email },
        input.author,
      );
      const inputWithAuthorId = { ...input, author: author._id };
      const comment = await Comment.create(inputWithAuthorId);
      post.comments.push(comment._id);
      await post.save();
      const updated = await Post.populate(post, {
        path: 'comments',
        populate: {
          path: 'author',
        },
      });
      return res.send(updated);
    } catch (e) {
      return res.send(e);
    }
  });

router
  .route('/posts/:id/comments/:cid')
  .get(findById(Comment, 'cid'))
  .put(updateById(Comment, 'cid'))
  .delete(async (req, res) => {
    try {
      const { id, cid } = req.params;
      await Comment.findByIdAndRemove(cid);
      const post = await Post.findByIdAndUpdate(
        id,
        { $pull: { comments: cid } },
        { new: true },
      );
      return res.send(post);
    } catch (e) {
      return res.send(e);
    }
  });

router
  .route('/comments')
  .get(findAll(Comment))
  .post(async (req, res) => {
    try {
      const input = req.body;
      const author = await createAuthor(input.author);
      const inputWithAuthorId = { ...input, author: author._id };
      const comment = await Comment.create(inputWithAuthorId);
      return res.send(comment);
    } catch (e) {
      return res.send(e);
    }
  });

router
  .route('/comments/:id')
  .get(findById(Comment))
  .put(updateById(Comment))
  .delete(deleteById(Comment));

router
  .route('/authors')
  .get(findAll(Author))
  .post(basicCreate(Author));

router
  .route('/authors/:id')
  .get(findById(Author))
  .put(updateById(Author))
  .delete(deleteById(Author));

export default router;
