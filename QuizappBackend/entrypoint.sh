#!/bin/sh
# make sure script doesn't silently fail
set -euo pipefail

# check for dependencies and install if not found
# if ! command -v pm2 &> /dev/null
# then
#     echo "pm2 not found, installing..."
#     yarn global add pm2
# fi

# if ! command -v tsc &> /dev/null
# then
#     echo "Typescript not found, installing..."
#     yarn global add typescript
# fi

# stop any previously running processes
# echo "Stopping previous processes..."
# pm2 stop all

# set up pm2 to run uncompiled ts application
# echo "Checking for pm2 updates and setting up typescript compatibility..."
# pm2 update
# pm2 install typescript

# install dependencies
echo "Installing node dependencies..."
cd /app
yarn --verbose

# start 
echo "Starting application!"
# pm2-runtime start pm2-config.json --no-daemon
yarn start