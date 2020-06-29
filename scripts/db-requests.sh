#!/bin/bash

# loop over all json files in ../server/data
for file in ./server/data/*.json
do
  # send POST requests
  curl -X POST -H "Content-Type: application/json" -d @$file http://localhost:5000
done