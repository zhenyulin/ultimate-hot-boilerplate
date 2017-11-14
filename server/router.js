import express from 'express';

import message from './handlers/message';
import graphql from './handlers/graphql-post';
import rest from './handlers/rest-post';
import index from './handlers/index';

const router = express.Router();

router.use('/message', message);
router.use('/graphql', graphql);
router.use('/rest', rest);
router.use('*', index);

export default router;
