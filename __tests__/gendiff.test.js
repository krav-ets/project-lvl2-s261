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
    const beforeYamlPath = '__tests__/__fixtures__/plain_before.yaml';
    const afterYamlPath = '__tests__/__fixtures__/plain_after.yaml';

    const diffString = genDiff(beforeYamlPath, afterYamlPath);

    const expected = fs.readFileSync('__tests__/__fixtures__/plain_expected', 'utf-8');

    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 4: ini plain', () => {
    const beforeIniPath = '__tests__/__fixtures__/plain_before.ini';
    const afterIniPath = '__tests__/__fixtures__/plain_after.ini';

    const diffString = genDiff(beforeIniPath, afterIniPath);

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

  it('#checkpoint 5: YAML tree', () => {
    const beforeYamlPath = '__tests__/__fixtures__/before.yaml';
    const afterYamlPath = '__tests__/__fixtures__/after.yml';

    const diffString = genDiff(beforeYamlPath, afterYamlPath);

    const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8');
    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 5: ini tree', () => {
    const beforeIniPath = '__tests__/__fixtures__/before.ini';
    const afterIniPath = '__tests__/__fixtures__/after.ini';

    const diffString = genDiff(beforeIniPath, afterIniPath);

    const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8');
    expect(diffString).toEqual(expected);
  });
});
