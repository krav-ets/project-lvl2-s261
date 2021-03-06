run-tree:
	npm run babel-node -- src/bin/gendiff.js -f tree __tests__/__fixtures__/before_tree.json __tests__/__fixtures__/after_tree.json

run-plain:
	npm run babel-node -- src/bin/gendiff.js -f plain __tests__/__fixtures__/before_tree.json __tests__/__fixtures__/after_tree.json

run-json:
	npm run babel-node -- src/bin/gendiff.js --format json __tests__/__fixtures__/before_tree.ini __tests__/__fixtures__/after_tree.ini

run-na:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before_tree.ini __tests__/__fixtures__/after_tree.ini

run-help:
	npm run babel-node -- src/bin/gendiff.js -h

build:
	rm -rf dist
	npm run build

test:
	npm test

watch:
	npm test -- --watch

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test
