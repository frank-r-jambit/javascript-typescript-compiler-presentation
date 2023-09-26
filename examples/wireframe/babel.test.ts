/**
 * currently this file contains pseudo code that should run some test cases of the wireframe
 */

import { transformJavascriptWithBabelPlugins } from './index';

test('find & replace in javascript content', async () => {
  const testString = `  const uliloginlayer = { config: { version: '20201007-1', env: 'prod' } };`;
  const output = transformJavascriptWithBabelPlugins(testString);

  expect(output).toContain('getGlobalEnv()');
  expect(output).toContain('isLocalEnv()');
});
