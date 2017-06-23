import express from 'express';

import index from 'server/handler/index';

const router = express.Router();

router.use(index);

export default router;
