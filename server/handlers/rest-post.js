import express from 'express';

import Post from 'server/models/post';
import Comment from 'server/models/comment';
import Author from 'server/models/author';

const router = express.Router();

router.get('/post/:id', async (req, res) => {
  res.send('stub');
});

export default router;
