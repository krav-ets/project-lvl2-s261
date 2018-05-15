import fs from 'fs';
import genDiff from '../src';

describe('gendiff', () => {
  it('#checkpoint 2', () => {
    const beforeJsonPath = '__tests__/__fixtures__/cp2_before.json';
    const afterJsonPath = '__tests__/__fixtures__/cp2_after.json';

    const diffString = genDiff(beforeJsonPath, afterJsonPath);

    const expected = fs.readFileSync('__tests__/__fixtures__/cp2_expected', 'utf-8');

    expect(diffString).toEqual(expected);
  });
});
