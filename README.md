# Quizapp

codingKIDZ Quizapp is an application to test knowledge of MIT Scratch

# System Requirements
[Docker Compose](https://docs.docker.com/compose/install/)
- On macOS and Windows Compose will be installed along with the basic [Docker install](https://docs.docker.com/engine/install/) install



# Install and Run
***Start the backend before starting the frontend***
## Backend
```bash
cd QuizappBackend
# Install Dependencies
yarn
# Start database and express server
docker-compose up
# Connect to database and create tables defined in prisma schema, run on first install and after making any changes to the schema
yarn prisma migrate dev --preview-feature 
```

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
Libraries
- [Express.js](https://expressjs.com/): A minimalist Node.js framework
- [Prisma](prisma.io/): Used to manage DB schema (`src/prisma/schema.prisma`), connection, and operations. Generates typescript definitions to be used throughout app for easy, safe DB communication


## Frontend
Libraries
- [React Native](reactnative.dev/): Cross-platform native apps generated from a single javascript codebase

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

<!-- # License
[MIT](https://choosealicense.com/licenses/mit/) -->