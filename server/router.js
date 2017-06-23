import express from 'express';

import index from './handlers/index';
import info from './handlers/info';

const router = express.Router();

router.use('/info', info);
router.use(index);

export default router;
