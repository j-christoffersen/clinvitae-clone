# CLINVITAE Clone

This project is a simple clone of [Invitae's CLINVITAE portal](http://clinvitae.invitae.com/).

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Environment Variables](#environment-variables)
   1. [Database Setup](#database-setup)

## Usage

### Installing Dependencies

`npm i`

### Environment Variables

There are a few environment variables that are required to run the app.

- `PORT`: the port the server will listen on
- `NODE_ENV`: either development or test
- `DB_FILE_PATH: the path to the file where the data will be loaded from. See [Database Setup](#database-setup)
- `DB_USER`: the user who has access to the created database
- `DB_PASSWORD`: see above
- `DB_NAME_DEVELOPMENT`: name of the development database on your machine
- `DB_NAME_TEST`: see above


This repo makes use of the [`dotenv`](https://www.npmjs.com/package/dotenv) package to help specify environment variables. To use dotenv, create a file named `.env` in the root directory, and add your environment variable definitins there.

### Database Setup

To set up the development and testing databases, create new PostgreSQL databases and add names to the [.env](#environment-variables) file, or use the default names `clinvitae` and `clinvitae-test`.

To load the developmnet database, run the command `npm run db:load`. Be sure to have specified a path to the .tsv you wish to load from.

To seed the test database, run `knex seed:run`. Be sure that `NODE_ENV` is set to `test`.

### Everything Else

## Requirements

NodeJS
NPM
Mocha `npm i -g mocha`
