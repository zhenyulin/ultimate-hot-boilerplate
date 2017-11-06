import express from 'express';

import message from './handlers/message';
import post from './handlers/post';
import index from './handlers/index';

const router = express.Router();

router.use('/message', message);
router.use('/post', post);
router.use('/graphql', post);
router.use('*', index);

export default router;
