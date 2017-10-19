// @flow

import { Selector } from 'testcafe';

fixture(`Index`).page(`http://localhost:3000`);

test('page load', async t => {
  await t.expect(Selector('body')).ok();
});
