# react-fullstack-boilerplate

### [create-react-app](https://github.com/facebook/create-react-app) + react-router + express proxy api server + working mongo CRUD with mongoose -- preconfigured to deploy to Heroku ###

### SETUP and INSTALLATION ###

[install mongoDB](https://docs.mongodb.com/manual/installation/) if you don't have it, then in the terminal run:
```
mongod
```

open a different terminal window and run:
```
git clone https://github.com/brettcnelson/react-fullstack-boilerplate.git
cd react-fullstack-boilerplate/
npm run setup
```
this installs node modules for the client and the server, and starts the app.

### USAGE ###

in the future, run:
```
npm start
```
to start the app.

### DEPLOYMENT ###

To deploy to Heroku make sure you have an [account](https://www.heroku.com/) and the [CLI](https://devcenter.heroku.com/articles/heroku-cli). If you don't have a remote mongo database, [mLab](https://mlab.com/signup/) is very easy to get up and running.

Create and configure the app by running:
```
heroku create
heroku config:set MONGO_URI=your-remote-mongo-uri
```
Look at the Heroku docs if you want to set the name of your app from the CLI.  But it's easy to rename it later if you want.

Whenever you want to deploy, commit all changes to git, then:
```
git push heroku master
```
