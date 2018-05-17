import fs from 'fs';
import genDiff from '../src';

describe('gendiff', () => {
  it('#checkpoint 2: JSON plain', () => {
    const beforeJsonPath = '__tests__/__fixtures__/plain_before.json';
    const afterJsonPath = '__tests__/__fixtures__/plain_after.json';

    const diffString = genDiff(beforeJsonPath, afterJsonPath);

    const expected = fs.readFileSync('__tests__/__fixtures__/plain_expected', 'utf-8');

    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 3: YAML plain', () => {
    const beforeJsonPath = '__tests__/__fixtures__/plain_before.yaml';
    const afterJsonPath = '__tests__/__fixtures__/plain_after.yaml';

    const diffString = genDiff(beforeJsonPath, afterJsonPath);

    const expected = fs.readFileSync('__tests__/__fixtures__/plain_expected', 'utf-8');

    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 4: ini plain', () => {
    const beforeJsonPath = '__tests__/__fixtures__/plain_before.ini';
    const afterJsonPath = '__tests__/__fixtures__/plain_after.ini';

    const diffString = genDiff(beforeJsonPath, afterJsonPath);

    const expected = fs.readFileSync('__tests__/__fixtures__/plain_expected', 'utf-8');
    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 5: JSON tree', () => {
    const beforeJsonPath = '__tests__/__fixtures__/before.json';
    const afterJsonPath = '__tests__/__fixtures__/after.json';

    const diffString = genDiff(beforeJsonPath, afterJsonPath);

    const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8');
    expect(diffString).toEqual(expected);
  });
});
