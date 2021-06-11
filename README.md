# Quizapp

codingKIDZ Quizapp is an application to test knowledge of MIT Scratch

# System Requirements
[Docker Compose](https://docs.docker.com/compose/install/)
- On macOS and Windows Compose will be installed along with the basic [Docker install](https://docs.docker.com/engine/install/) install

# Install and Run
***Start the backend before starting the frontend***
## Backend and Admin Panel
```bash
# Install Dependencies
yarn
# Start database, express server, admin web server, and nginx
docker-compose up
# Connect to database and create tables defined in prisma schema
# run on first install and after making any changes to the schema
yarn prisma migrate dev --preview-feature 
```

Go to `localhost` in your browser to see the admin panel

To make API calls use `localhost:8000/api/...`

## Frontend
```bash
cd QuizappFrontend
# Install Dependencies
yarn
# Start metro server
yarn start
# Open up second terminal in same folder and run either iOS or Android Simulator
yarn [ios|android]
```

# Stack

[Typescript](typescriptlang.org/) is used across the stack to improve IDE experience and reduce bugs

## Backend
- Server
  - [Express.js](https://expressjs.com/): A minimalist Node.js framework
  - [Prisma](prisma.io/): Used to manage DB schema (`src/prisma/schema.prisma`), connection, and operations. Generates typescript definitions to be used throughout app for easy, safe DB communication
- Database
  - PostgreSQL
- Webserver: Nginx
  - Reverse proxies connections to the backend server and web admin panel


## Mobile Frontend
Libraries
- [React Native](reactnative.dev/): Cross-platform native apps generated from a single javascript codebase

## Web Admin Panel
Libraries
- [React](https://reactjs.org/): Web framework centered around creating reusable components

# Folder Structure
Explanation of important files and folders

## Backend

```bash
QuizappBackend
├── docker-compose.yml # Define docker containers for backend server and database instance
├── docker-local # Contains files for docker instance like postgres data and logs
├── entrypoint.sh # Entrypoint file for Docker backend container
├── package.json # Project Dependencies
├── pm2-config.json
├── src
│   ├── controllers # Request controllers, makes calls to services
│   ├── exceptions
│   ├── interfaces
│   ├── middleware # Auth guards, error middleware, etc
│   ├── prisma # Contains prisma scehma and some related exports
│   ├── routes # Assigns controllers and middleware to routes and HTTP Methods
│   ├── services # Business Logic
│   └── utils # Misc constants, logic, and loggers
├── tsconfig.json
├── index.ts # Contains logic to start and configure app
└── yarn.lock
```

## Frontend
```bash
QuizappFrontend
├── android # Android studio project
├── babel.config.js
├── index.native.js
├── ios # Xcode project
├── metro.config.js
├── package.json # Project Dependencies
├── public # Public folder for react-native-web build
│   └── index.html
├── src
│   ├── App.tsx # Main app
│   ├── app.json
│   ├── assets # Required images and logos
│   ├── ducks # Redux logic
│   ├── index.js # Entrypoint for application
│   ├── pages # Frontend views
│   └── utils # Misc constants and helper logic
├── tsconfig.json # Typescript rules
└── yarn.lock
```

# Useful Commands to Know
- Generate updated type definitions after making changes to prisma schema
```bash
yarn prisma generate
```

- Seed (populate) the database from `QuizappBackend/src/prisma/seed.ts`
  - If this fails, maybe you forgot to create the tables using `yarn prisma migrate dev --preview-feature`
```bash
yarn prisma db seed --preview-feature
```

If backend is stuck at `[4/4] Building fresh packages...`, run `docker ps -a` to find the container ID, then `docker stop [containerID]` (pro-tip you can just type in the first few characters of the ID), then from the project root `docker compose up -d` to start up the backend service again (assuming you already have another window dedicated to running `docker compose up`, it will show the backend starting up again in that window)

<!-- # License
[MIT](https://choosealicense.com/licenses/mit/) -->