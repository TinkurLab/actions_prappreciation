#!/bin/bash

echo "starting bash..."

echo "current working directory is " $PWD
cd ../../
cd /action

export GITHUB_EVENT_PAYLOAD=$(cat /github/workflow/event.json)

echo "contents of GITHUB_EVENT_PAYLOAD is " GITHUB_EVENT_PAYLOAD

npm install

node index.js