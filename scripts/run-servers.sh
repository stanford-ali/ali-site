#!/bin/bash

main = $PWD

# run the frontend and backend servers in parallel
cd server
npm run prod &
P1=$!
osascript -e 'tell app "Terminal" to do script "cd '$main'/client
npm start"' &
P2=$!
wait $P1 $P2