install:
	@yarn
	@flow-typed install

cleanup:
	@echo 'cleaning up'
	@rm -rf .build node_modules coverage dist flow-typed/npm *.log

run:
	@rm -rf .build
	@npx webpack --config config/webpack.server.dev.js

lint:
	@npx eslint client server config features

lint-fix:
	@npx eslint client server config features --fix

lint-watch:
	@npx nodemon -q --exec 'make lint-fix'

stylelint:
	@npx stylelint client

stylelint-watch:
	@npx nodemon -q --exec 'make stylelint'

typecheck:
	@npx flow

typecheck-watch:
	@npx nodemon -q -e js --exec 'make typecheck'

test:
	@npx jest client server

test-watch:
	@npx jest client server --watch

test-coverage:
	@npx jest client server --coverage --forceExit

smoke:
	@npx testcafe -c 3 nightmare features

smoke-staging:
	@NODE_ENV=production npx testcafe nightmare features

build-client:
	@npx webpack --config config/webpack.client.prod.js --bail

build-server:
	@npx webpack --config config/webpack.server.prod.js --bail

build:
	@rm -rf dist
	@make build-server
	@make build-client

serve:
	@NODE_ENV=production node dist/server.js

build-serve:
	@make build
	@make serve
