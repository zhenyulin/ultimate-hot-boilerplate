import messageLogics from './message';
import blogALogics from './blog-a';
import blogCLogics from './blog-c';
import blogDLogics from './blog-d';

export default [
  ...messageLogics,
  ...blogALogics,
  ...blogCLogics,
  ...blogDLogics,
];
