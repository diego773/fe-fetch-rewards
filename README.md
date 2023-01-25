## Fetch Rewards - Frontend Take-Home Exercise

## Description

A frontend wep app that accepts HTTP request and returns responses based on the conditions outlined in the next section.

## Technologies:

- React.js - It's used for building interactive user interfaces and web applications
- axios - is a promise-based HTTP Client for node.js and the browser
- Jest.js - is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase

## Table of Contents

- [Description](#description)
- [Technologies](#topics)
- [Installation](#installation)
- [Making API calls](#making-api-calls)
- [Running Test](#tests)

## Installation

Before installing this application on your local computer, ensure that you have npm or yarn installed globally on your machine.

Installation:

    1. Clone the repo or download the zip file to your local machine
    2. Open repo in vscode or text editor of choice
    3. Go to the root directory of the project
    4. npm install
    5. npm start

## Making API calls

Note: We are using Fetch Rewards API https://frontend-take-home.fetchrewards.com/form

## GET API request to https://frontend-take-home.fetchrewards.com/form will return a JSON body with the following format:

- {
  "occupations": [
  "occupation1",
  "occupation2",
  ...
  ],
  "states": [
  {
  "name": "Alabama",
  "abbreviation": "AL"
  },
  ...
  ]
  }

## POST API endpoint https://frontend-take-home.fetchrewards.com/form

Accepts an input and select options which axios formats into a JSON Body

For each call, all the inputs should contain the following:

- Full Name
- Email
- Password
- Select Ocuppation
- Select State

When entering your email in the input field, a warning in red will show you if you entered invalid characters (missing @ and .).

Click the Sign up button and you will get a Status Code:201 for created response if all fields are provided will return a JSON body with the following format:

- {
  "name": "Michael Scott",
  "email": "michael.scott@dundermifflinpaper.biz",
  "password": "heyimdatemikenicetomeetme",
  "occupation": "Alexa Impersonator",
  "state": "Pennsylvania"
  }

## Running Test

    1. Run the test file with the following command:
    2. npm run test or npm test

The test file will run the following tests:

- Test to make sure all the input fields are filled
- POST a new registration
- GET occupation and state

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
