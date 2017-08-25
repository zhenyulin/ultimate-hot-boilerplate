import express from 'express';

import index from './handlers/index';
import info from './handlers/info';
import message from './handlers/message';

const router = express.Router();

router.use('/info', info);
router.use('/message', message);
router.use(index);

export default router;
