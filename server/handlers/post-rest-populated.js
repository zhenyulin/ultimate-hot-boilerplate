import express from 'express';

import Post from 'server/models/post';
import Comment from 'server/models/comment';
import Author from 'server/models/author';

const router = express.Router();

router.route('/posts').get(async (req, res) => {
  const posts = await Post.find().populate({
    path: 'comments',
    populate: {
      path: 'author',
    },
  });
  return res.send(posts);
});

router.route('/posts/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndRemove(id);
    const { comments } = post;
    await Comment.remove({ _id: { $in: comments } });
    return res.send(post);
  } catch (e) {
    return res.send(e);
  }
});

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

router.route('/posts/:id/comments/:cid').delete(async (req, res) => {
  try {
    const { id, cid } = req.params;
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
    return res.send(updated);
  } catch (e) {
    return res.send(e);
  }
});

export default router;
