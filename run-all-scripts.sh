#!/bin/bash

# make scripts executable
chmod +x ./scripts/*.sh

# run scripts
./scripts/install-dependencies.sh
./scripts/run-servers.sh
./script/setup-db.sh