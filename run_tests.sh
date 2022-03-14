#!/bin/bash
echo building js files
npm run build
echo build finished
echo starting http server
cd dist
nohup  python3 -m http.server 8000 >/dev/null 2>&1 &
serverPID=$!
echo http server running PID $serverPID
echo starting the tests
cd ..
export CYPRESS_baseUrl=http://localhost:8000
npm run cypress:run
echo tests finished
echo killing http server
kill $serverPID

