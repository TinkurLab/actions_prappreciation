#!/bin/bash

echo "starting bash..."

echo "current working directory is " $PWD

cd .. 
cd ..
cd /action

echo "current working directory is " $PWD

ls

npm install

node index.js