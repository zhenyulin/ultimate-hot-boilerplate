// @flow

import express from 'express';
import type { $Request, $Response } from 'express';

import Message from 'server/models/message';

const router = express.Router();

export const ERROR_MESSAGE = { message: 'input param error' };

router.get('/:messageId', async (req: $Request, res: $Response) => {
  const messageId: number = parseInt(req.params.messageId, 10);
  if (Number.isInteger(messageId) && messageId >= 0) {
    const id = messageId % 2;
    const message = await Message.findOne({ id });
    return res.send(message);
  }
  return res.status(400).send(ERROR_MESSAGE);
});

export default router;
