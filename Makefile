check-version:
    @node tools/checkversion
install: check-version
    yarn install
# develop: check-version
#     gatsby develop
# build: check-version
#     gatsby build
# serve:
#     gatsby serve
run-prod: build serve
fmt: check-version
    yarn run format
    yarn run sort-imports
test: check-version
    yarn test
build:
	mkdir -p dist && node ./dist/md5.min.js ./dist/minify.min.js 2f49bf845e000c83aefae88d953e960f
