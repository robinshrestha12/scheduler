# Interview Scheduler
## Project Description
This project is developed as a part of student assignment while studying in Lighthouse Lab. With this application, a student can create, edit and delete interview appointments. It uses React, custom hooks, PostgreSQL database. The application to API server over HTTP by JSON format. The development follows the Test Driven Development-individual componenent testing and End-to-End testing.

## Features
- Appointment days are in displayed in the left with number of spots remaining and the selected day in white background
- The days can be selected and the details are displayed in the right
- User can book interview in the empty slot
- User can edit and delete the appointments too.
- The changed values are displayed 
- Confirming action dialogue is implemented as well as edge cases are also handled

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

### Home Page
!['Home Page']()
_This is home page.

### Book Appointment
!['Book an Appointment']()
_This shows booking appointment.

### Booked Appointment
!['Booked Appointment']()
_This shows booked Appointment along with number of days left.

### Edit Appointment
!['Edit Appointment']()
_This is Edit appointment.

### Delete Appointment
!['Delete appointment']()
_This is delete appointment confirmation.

## Project Stack
__Front-End:__React, JSX, HTML, JavaScript, Axios

__Back-End:__Node.js, Express, Postgres

__Testing:__Storybook, Webpack Dev Server, Cypress, Jest

## Dependencies
-	classnames
-	normalize.css
-	react
-	react-dom
-	react-hooks-testing-library
-	react-scripts
-	@babel/core
-	@storybook/addon-actions
-	@storybook/addon-backgrounds
-	@storybook/addon-links
-	@storybook/addons
-	@storybook/react
-	@testing-library/jest-dom
-	@testing-library/react
-	babel-loader
-	node-sass
-	prop-types
-	react-test-renderer

