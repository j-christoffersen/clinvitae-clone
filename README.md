# Genomic Variants

This project is a simple app where you can search for information on various genomic variants.

# Table of Contents

1. [Requirements](#requirements)
1. [Usage](#Usage)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Environment Variables](#environment-variables)
   1. [Database Setup](#database-setup)
   1. [Starting the Application](#starting-the-application)

## Requirements

- NodeJS v9.1.2
- NPM v5.6.0
- Mocha `npm install -g mocha` v5.0.5
- Postgres v9.5.12

## Usage

### Installing Dependencies

`npm install`

### Environment Variables

There are a few environment variables that are required to run the app.

- `PORT`: the port the server will listen on
- `TEST_PORT`: the port the server will listen on during testing, must be different from PORT in order to run tests while the server is running.
- `NODE_ENV`: either development or test
- `DB_FILE_PATH`: the path to the file where the data will be loaded from. See [Database Setup](#database-setup)
- `DB_USER`: the user who has access to the created database
- `DB_PASSWORD`: see above
- `DB_NAME_DEVELOPMENT`: name of the development database on your machine
- `DB_NAME_TEST`: see above


This repo makes use of the [`dotenv`](https://www.npmjs.com/package/dotenv) package to help specify environment variables. To use dotenv, fill in your environment variables in `sample.env`, and then rename the file to `.env`.

### Database Setup

To set up the development and testing databases, create new PostgreSQL databases and add names to the [.env](#environment-variables) file, or use the default names `clinvitae` and `clinvitae-test`.

To run migrations on the database, run `npm run db:migrate`

To load the developmnet database, download and the file containing the variant data [here](http://clinvitae.invitae.com/download). Once you've specified the path to the file, run the command `npm run db:load`. This may take a few minutes.

To seed the test database, run `knex seed:run`. Be sure that `NODE_ENV` is set to `test`.

### Starting the Application

To compile the app, run `npm run build`, or `npm run build-dev` if you wish to have webpack watch for changes.

To run the server, simply run `npm start`.

To run tests, make sure `NODE_ENV` is set to `test` and run `npm test`.
