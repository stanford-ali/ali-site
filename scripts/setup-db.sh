#!/bin/bash

# loop over all json files in ../server/data
for file in ./server/data/*.json
do
  # strip filename
  file_no_json=${file%.json}
  filename=${file_no_json#"./server/data/"}

  # send POST requests
  curl -X POST -H "Content-Type: application/json" -d @$file http://localhost:5000/$filename
done