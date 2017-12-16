import express from 'express';

import message from './handlers/message';
import graphql from './handlers/post-graphql';
import flat from './handlers/post-rest-flat';
import populated from './handlers/post-rest-populated';
import index from './handlers/index';

const router = express.Router();

router.use('/message', message);
router.use('/graphql', graphql);
router.use('/flat', flat);
router.use('/populated', populated);
router.use('*', index);

export default router;
