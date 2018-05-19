import fs from 'fs';
import genDiff from '../src';

const beforeJsonPath = '__tests__/__fixtures__/before.json';
const afterJsonPath = '__tests__/__fixtures__/after.json';
const beforeYamlPath = '__tests__/__fixtures__/before.yaml';
const afterYamlPath = '__tests__/__fixtures__/after.yaml';
const beforeIniPath = '__tests__/__fixtures__/before.ini';
const afterIniPath = '__tests__/__fixtures__/after.ini';
const beforeJsonTreePath = '__tests__/__fixtures__/before_tree.json';
const afterJsonTreePath = '__tests__/__fixtures__/after_tree.json';
const beforeYamlTreePath = '__tests__/__fixtures__/before_tree.yaml';
const afterYamlTreePath = '__tests__/__fixtures__/after_tree.yml';
const beforeIniTreePath = '__tests__/__fixtures__/before_tree.ini';
const afterIniTreePath = '__tests__/__fixtures__/after_tree.ini';

const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8');
const expectedTree = fs.readFileSync('__tests__/__fixtures__/expected_tree', 'utf-8');
const expectedPlain = fs.readFileSync('__tests__/__fixtures__/expected_plain', 'utf-8');
const expectedJson = fs.readFileSync('__tests__/__fixtures__/expected.json', 'utf-8');

describe('gendiff', () => {
  it('#checkpoint 2: JSON', () => {
    const diffString = genDiff(beforeJsonPath, afterJsonPath, 'tree');
    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 3: YAML', () => {
    const diffString = genDiff(beforeYamlPath, afterYamlPath, 'tree');
    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 4: ini', () => {
    const diffString = genDiff(beforeIniPath, afterIniPath, 'tree');
    expect(diffString).toEqual(expected);
  });

  it('#checkpoint 5: JSON tree', () => {
    const diffString = genDiff(beforeJsonTreePath, afterJsonTreePath, 'tree');
    expect(diffString).toEqual(expectedTree);
  });

  it('#checkpoint 5: YAML tree', () => {
    const diffString = genDiff(beforeYamlTreePath, afterYamlTreePath, 'tree');
    expect(diffString).toEqual(expectedTree);
  });

  it('#checkpoint 5: ini tree', () => {
    const diffString = genDiff(beforeIniTreePath, afterIniTreePath, 'tree');
    expect(diffString).toEqual(expectedTree);
  });

  it('#checkpoint 6: plain output', () => {
    const diffString = genDiff(beforeJsonTreePath, afterJsonTreePath, 'plain');
    expect(diffString).toEqual(expectedPlain);
  });

  it('#checkpoint 7: JSON output', () => {
    const diffString = genDiff(beforeYamlTreePath, afterYamlTreePath, 'json');
    expect(diffString).toEqual(expectedJson);
  });
});
