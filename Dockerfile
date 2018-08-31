# Expose the compatibility test CLI.
# The CLI offers the following features:
#   * Generate test data: docker run --mount type=bind,source="$(pwd)"/samples,target=/samples stratumn/js-chainscript:latest generate /samples/js-samples.json
#   * Validate test data: docker run --mount type=bind,source="$(pwd)"/samples,target=/samples stratumn/js-chainscript:latest validate /samples/go-samples.json

FROM node:alpine

RUN mkdir /samples
RUN mkdir /chainscript
ADD . /chainscript

WORKDIR /chainscript
RUN npm i
RUN npm run build

ENTRYPOINT [ "node", "./lib/cli/cli.js" ]