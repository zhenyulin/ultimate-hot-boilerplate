import express from 'express';
import indexPage from '../../client/index.html';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(indexPage);
});

export default router;
