#!/bin/sh

# if ! command -v pm2 &> /dev/null
# then
#     yarn global add pm2
# fi

# if ! command -v tsc &> /dev/null
# then
#     yarn global add typescript
# fi

# pm2 update
# pm2 install typescript

cd /app
yarn

# pm2 start pm2-config.json

yarn start