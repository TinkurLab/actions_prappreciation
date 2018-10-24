#!/bin/bash

echo "starting bash..."

cat /github/workflow/event.json
cat ./github/workflow/event.json
cat ~/github/workflow/event.json

export GITHUB_EVENT_PAYLOAD=$(cat event.json)

echo "contents of GITHUB_EVENT_PAYLOAD is " GITHUB_EVENT_PAYLOAD

echo "current working directory is " $PWD
cd ../../
cd /action

npm install

node index.js