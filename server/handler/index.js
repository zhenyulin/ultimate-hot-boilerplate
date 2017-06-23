import express from 'express';
import IndexPage from '../../client/index.html';

const router = express.Router();

router.get('*', (req, res) => {
  res.send(IndexPage);
});

export default router;
