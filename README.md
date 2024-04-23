# Star Wars

## Installation

First, download the zip or clone this repository into your personal computer.

Use the package manager [npm] to install the dependencies.

```bash
npm install
```

After that, you can launch the application using the following command:

```
npm run dev
```

To run the test suite, use the following command:

```
npm run test
```

To run tests and generate a coverage report, use the following command:

```
npm run coverage
```

## How to use the app

There are two pages -

1. List View: Displays a list of Star Wars characters with their names, genders, and home planets. You can navigate to a specific character's details by clicking on their name.
2. Detail View: Displays detailed information about a specific Star Wars character, including their name, height, hair color, eye color, gender, home planet, and the films they have appeared in.

## Pages

- "/": Home page (Characters);
- "/characters/:id": Specific character's page;

## What technologies does this project use?

The whole app was made with ReactJs. To style, it's uses material-ui.

Others libs used:

- React Query (to fetch, cache, sync and update the state)
- Axios (to make requests to API);
- React Router DOM ( to route);
