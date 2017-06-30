import express from 'express';

const router = express.Router();

router.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    const render = require('server/render').default;
    const page = render();
    return res.send(page);
  }
  const page = require('client/index.html');
  return res.send(page);
});

export default router;
