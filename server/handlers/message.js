// @flow

import express from 'express';
import type { $Request, $Response } from 'express';

const router = express.Router();

export const MESSAGES = [
  {
    id: 0,
    title: 'Pariatur irure occaecat nostrud cillum.',
    body:
      'Magna nulla dolore ut esse laborum dolor aute deserunt commodo non minim ad anim in occaecat nostrud anim consectetur cillum qui in labore labore dolor dolor mollit cillum minim reprehenderit quis labore sed anim.',
  },
  {
    id: 1,
    title:
      'Officia mollit culpa pariatur aliquip est dolore amet adipisicing veniam culpa dolor veniam excepteur pariatur sed.',
    body:
      'Id ut qui elit commodo aute occaecat irure ut officia nulla magna officia consectetur exercitation aliqua qui mollit do fugiat duis duis labore amet duis incididunt adipisicing esse esse ea aliquip commodo minim nisi consequat minim veniam in veniam ut quis deserunt do do sunt in aliquip irure qui reprehenderit aliquip aliquip occaecat magna voluptate consequat aute velit ex ex mollit consequat laboris enim velit nostrud incididunt elit veniam incididunt non commodo nulla sed incididunt exercitation laboris aute est nulla nisi commodo cupidatat deserunt occaecat id sunt consequat reprehenderit dolor ut aute mollit non tempor in do ut excepteur ea sit consequat occaecat consectetur deserunt eiusmod cupidatat nulla pariatur id mollit aute deserunt in et amet laboris laborum do laborum laboris sed sed proident qui dolore in do mollit aliqua exercitation sint reprehenderit exercitation excepteur in ex culpa nostrud sint quis do duis aliquip officia officia excepteur veniam fugiat enim nulla in exercitation deserunt ad aliquip in id commodo fugiat elit sed veniam magna in irure laborum laboris mollit nulla eiusmod duis do proident cupidatat consequat proident aute elit quis qui ullamco in ut qui ea amet ex amet laboris consequat sint amet exercitation dolor elit cillum irure dolor consequat cupidatat nostrud adipisicing sint ea nostrud qui tempor ex incididunt amet sint proident in labore commodo laboris occaecat non pariatur elit laborum dolor quis consequat qui quis dolor voluptate aliquip nulla quis ad culpa id sunt ullamco ea amet ullamco eu nisi cupidatat dolore qui consectetur nulla amet pariatur.',
  },
];

export const ERROR_MESSAGE = { message: 'input param error' };

router.get('/:messageId', (req: $Request, res: $Response) => {
  const messageId: number = parseInt(req.params.messageId, 10);
  if (Number.isInteger(messageId) && messageId >= 0) {
    return res.send(MESSAGES[messageId % 2]);
  }
  return res.status(400).send(ERROR_MESSAGE);
});

export default router;
