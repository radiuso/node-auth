# Node-auth React

This project is a prototype to try functionnalities like 

* Form Validation
* Login
* ...

It was generated using create-react-app.

## React librairies

* Redux (http://redux.js.org)
* React Semantic ui (http://react.semantic-ui.com/)
* Formsy React (https://github.com/christianalfoni/formsy-react)


## Testing 

- karma
- chai 
- sinon

Testing scripts are started thanks gulp.
Test files are located in 
- server/api/{endpoint}/{endpoint}.integration.js
- server/api/{endpoint}/{endpoint}.spec.js

Test server side
> npm run test:server

Test client side
> npm run test:app

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
- [Cross-env](https://github.com/kentcdodds/cross-env) - Cross os command
- [Nodemon](https://github.com/remy/nodemon) - Watch server changes

## Getting Started

1. Run `npm install` to install dependencies.
2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

### Developing

3. Run `npm run start:dev` to run server side in development mode
4. Run `npm run start:app` to run client side in development mode


### Production

3. Run `npm run build:app` to build static site in build folder
4. Run `npm run start` to run app in production mode

