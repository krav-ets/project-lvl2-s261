run:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/cp2_before.json __tests__/__fixtures__/cp2_after.json

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test
