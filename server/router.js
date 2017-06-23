import express from 'express';

import index from './handler/index';
import info from './handler/info';

const router = express.Router();

router.use('/info', info);
router.use(index);

export default router;
