import express from 'express';
import render from 'client/server-render';

const router = express.Router();

router.get('*', (req, res) => {
  const page = render();
  res.send(page);
});

export default router;
