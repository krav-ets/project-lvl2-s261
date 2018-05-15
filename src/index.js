import fs from 'fs';
import _ from 'lodash';

const genDiff = (beforePath, afterPath) => {
  const beforeData = fs.readFileSync(beforePath, 'utf-8');
  const afterData = fs.readFileSync(afterPath, 'utf-8');
  const beforeObject = JSON.parse(beforeData);
  const afterObject = JSON.parse(afterData);

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
