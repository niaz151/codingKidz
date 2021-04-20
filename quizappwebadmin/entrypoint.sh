#!/bin/sh
# make sure script doesn't silently fail
set -euo pipefail

# install dependencies
echo "Installing dependencies..."
cd /app
yarn

# start 
echo "Starting application!"
yarn start