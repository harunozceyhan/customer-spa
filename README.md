# Customer-SPA

Single Page Customer Application that performs CRUD operations on customer data.

## Before Start

-   Installation commands listed below runs server and client applications in development mode.
-   customer-server application runs on port 3000 and customer-client application runs on port 3001.
-   PostgreSQL is used as data source.

## Pre-Requisites

> To configure PostgreSQL connection URL, simply rename file .env.example to .env in customer-server folder.  
> Then edit .env file and enter your DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME info.

## Installation

-   `git clone https://github.com/harunozceyhan/customer-spa.git`
-   `cd customer-spa`
-   `npm install`
-   `npm run fullinstall`
-   `npm run start`

## App URL

-   [http://localhost:3001/](http://localhost:3001/)

## Server(customer-server) Project Run Test

-   cd customer-server
-   npm test

## Client(customer-client) Project Run Test

-   cd customer-client
-   npm test

## Technologies Used

-   Dev

    -   Conventional Commits
    -   Commitlint
    -   Husky

-   Client Side

    -   ES Lint 6
    -   Vue.js
    -   Vue CLI
    -   Vuex
    -   Vuetify
    -   Vue-router
    -   Axios
    -   vue-test-utils
    -   jest

-   Server Side

    -   Node.js
    -   Typescript
    -   Express
    -   Objection.js
    -   Knex
    -   pg
    -   mocha
    -   chai
