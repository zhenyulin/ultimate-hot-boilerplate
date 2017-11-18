import express from 'express';

import message from './handlers/message';
import graphql from './handlers/post.graphql';
import rest from './handlers/post.rest';
import index from './handlers/index';

const router = express.Router();

router.use('/message', message);
router.use('/graphql', graphql);
router.use('/rest', rest);
router.use('*', index);

export default router;
