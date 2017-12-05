import express from 'express';

const router = express.Router();

/* istanbul ignore next */
router.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    const render = require('server/render').default;
    const page = render();
    return res.send(page);
  }
  const template = require('client/index.html');
  const CONSTANT = require('client/constant');
  const page = template.replace('"-- CONFIG --"', JSON.stringify(CONSTANT));
  return res.send(page);
});

export default router;
