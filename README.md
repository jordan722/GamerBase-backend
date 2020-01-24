# GamerBase-backend

GamerBase is a Full-Stack app built for the Jan 2020 CUNY2X bootcamp. This repository serves as the backend for the app and was built with PostgresSQL and Node.js.

## Running

Use the package manager npm to install all prerequisite packages and start.

```bash
npm install
npm start
```

## Frontend repository

The frontend repository for the webapp can be found at [https://github.com/jordan722/GamerBase](https://github.com/jordan722/GamerBase)

# Link to Deployed Web-App

[This web app was deployed using heroku, and can be accessed here!](http://gamerbase.herokuapp.com/)

## APIs used

The backend makes use of calling the Twitch, Youtube, Mixer and rawg APIs. For more information about the APIs, their documentation can be found here:
- [https://dev.twitch.tv/docs/api](https://dev.twitch.tv/docs/api)
- [https://developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started)
- [https://dev.mixer.com/guides/core/introduction](https://dev.mixer.com/guides/core/introduction)
- [https://api.rawg.io/docs/](https://api.rawg.io/docs/)

## Use

Running the backend will create a database for users and posts. Make sure that postgreSQL or another database installed and set-up before using npm start. PostgreSQL can be found at https://www.postgresql.org/

## Routes

There are various routes for accessing and querying for data, please refer to the routes folder to discover what routes are available via calls to the backend.
