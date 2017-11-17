import express from 'express';
// import queryString from 'query-string';

import Post from 'server/models/post';
import Comment from 'server/models/comment';
import Author from 'server/models/author';

const router = express.Router();

const queryById = model => async (req, res) => {
  const { id } = req.params;
  try {
    const item = await model.findById(id);
    return res.send(item);
  } catch (err) {
    return res.status(404).send(err);
  }
};

const queryAll = model => async (req, res) => {
  try {
    const posts = await model.find();
    return res.send(posts);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const createAuthor = async author => {
  try {
    const result = await Author.findOneOrCreate(
      { email: author.email },
      author,
    );
    return result;
  } catch (err) {
    return err;
  }
};

router.get('/posts', queryAll(Post));
router.get('/posts/:id', queryById(Post));
router.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const updated = await Post.findOneAndUpdate({ _id: id }, update, {
    new: true,
  });
  return res.send(updated);
});

router.get('/comments', queryAll(Comment));
router.get('/comments/:id', queryById(Comment));
router.post('/comments/', async (req, res) => {
  try {
    const input = req.body;
    const author = await createAuthor(input.author);
    const inputWithAuthorId = { ...input, author: author._id };
    const comment = await Comment.create(inputWithAuthorId);
    return res.send(comment);
  } catch (err) {
    return res.send(err);
  }
});
router.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndRemove(id);
    return res.send(comment);
  } catch (err) {
    return res.send(err);
  }
});

router.get('/authors', queryAll(Author));
router.get('/authors/:id', queryById(Author));

export default router;
