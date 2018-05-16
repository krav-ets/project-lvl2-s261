import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

const genDiff = (beforePath, afterPath) => {
  const ext = path.extname(beforePath);
  const beforeData = fs.readFileSync(beforePath, 'utf-8');
  const afterData = fs.readFileSync(afterPath, 'utf-8');
  const parse = getParser(ext);
  const beforeObject = parse(beforeData);
  const afterObject = parse(afterData);

  const keys = _.union(_.keys(beforeObject), _.keys(afterObject));

  return `{\n${keys.map((key) => {
    if (_.has(beforeObject, key) && _.has(afterObject, key)) {
      if (beforeObject[key] === afterObject[key]) {
        return `    ${key}: ${beforeObject[key]}`;
      }
      return `  + ${key}: ${afterObject[key]}\n  - ${key}: ${beforeObject[key]}`;
    } else if (!_.has(beforeObject, key)) {
      return `  + ${key}: ${afterObject[key]}`;
    }
    return `  - ${key}: ${beforeObject[key]}`;
  }).join('\n')}\n}`;
};

export default genDiff;
