import fs from 'fs';
import genDiff from '../src';

describe('gendiff', () => {
  it('#checkpoint 2: JSON', () => {
    const beforeJsonPath = '__tests__/__fixtures__/before.json';
    const afterJsonPath = '__tests__/__fixtures__/after.json';

    const diffString = genDiff(beforeJsonPath, afterJsonPath, 'tree');

    const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8');

    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 3: YAML', () => {
    const beforeYamlPath = '__tests__/__fixtures__/before.yaml';
    const afterYamlPath = '__tests__/__fixtures__/after.yaml';

    const diffString = genDiff(beforeYamlPath, afterYamlPath, 'tree');

    const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8');

    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 4: ini', () => {
    const beforeIniPath = '__tests__/__fixtures__/before.ini';
    const afterIniPath = '__tests__/__fixtures__/after.ini';

    const diffString = genDiff(beforeIniPath, afterIniPath, 'tree');

    const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8');
    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 5: JSON tree', () => {
    const beforeJsonPath = '__tests__/__fixtures__/before_tree.json';
    const afterJsonPath = '__tests__/__fixtures__/after_tree.json';

    const diffString = genDiff(beforeJsonPath, afterJsonPath, 'tree');

    const expected = fs.readFileSync('__tests__/__fixtures__/expected_tree', 'utf-8');
    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 5: YAML tree', () => {
    const beforeYamlPath = '__tests__/__fixtures__/before_tree.yaml';
    const afterYamlPath = '__tests__/__fixtures__/after_tree.yml';

    const diffString = genDiff(beforeYamlPath, afterYamlPath, 'tree');

    const expected = fs.readFileSync('__tests__/__fixtures__/expected_tree', 'utf-8');
    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 5: ini tree', () => {
    const beforeIniPath = '__tests__/__fixtures__/before_tree.ini';
    const afterIniPath = '__tests__/__fixtures__/after_tree.ini';

    const diffString = genDiff(beforeIniPath, afterIniPath, 'tree');

    const expected = fs.readFileSync('__tests__/__fixtures__/expected_tree', 'utf-8');
    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 6: plain output', () => {
    const beforePath = '__tests__/__fixtures__/before_tree.json';
    const afterPath = '__tests__/__fixtures__/after_tree.json';

    const diffString = genDiff(beforePath, afterPath, 'plain');

    const expected = fs.readFileSync('__tests__/__fixtures__/expected_plain', 'utf-8');
    expect(diffString).toEqual(expected);
  });
});
