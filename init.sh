#!/bin/bash

brew install node

npm i -D ts-jest
npm install --save-dev jest ts-jest @types/jest

npm install -g typescript

npm i --save-dev @types/node
npm install commander

mkdir -p build/tests/tmp
echo '1' >> build/tests/tmp/tmpfile.txt
echo '3 4' >> build/tests/tmp/tmpfile.txt
echo '0001' >> build/tests/tmp/tmpfile.txt
echo '0011' >> build/tests/tmp/tmpfile.txt
echo '0110' >> build/tests/tmp/tmpfile.txt

echo 'invalid file' >> build/tests/tmp/invalidfile.txt

tsc