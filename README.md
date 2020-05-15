# hv-challenge-infinite_scroll

This challenge was completed within a four hour timeframe

## Architecture

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* [react-infinite-scroller](https://github.com/CassetteRocks/react-infinite-scroller)

## Running the application

Runs the app in the development mode by executing the following command from the project root directory

```
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running the test suite

Invoke the test suite by running the following command from the project root directory:

```
yarn test
```

## Notes
* I set a maximum time-limit of four hours to complete this exercise
* Given the time constraint, I chose to leverage an existing [infinite scroll UI library](https://github.com/CassetteRocks/react-infinite-scroller) to complete the assessment. If this functionality were necessary to be built from scratch (perhaps for efficiency scenarios like removing/appending DOM nodes when existing nodes are out of the window scope), I would leverage the [Intersectional Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and [React useRef hook](https://reactjs.org/docs/hooks-reference.html#useref) to identify when to trigger an external API call - keeping the number of calls to a minimum by referencing the first and last list item elements, window/scroll threshold for triggering an HTTP request, as well as modifying the pagination and fetch limit parameters via state
* If I had more time to iterate, I would continue tweaking the unit tests - especially the mocking, then style the application and components prior to submitting a feature pull-request