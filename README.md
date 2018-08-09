# The Metamatic Car App Demo ( One-Way Events Variant) 

This is a **One-Way-Events** variant of the original [Metamatic Car App Demo](https://github.com/develprr/metamatic-car-app) implementation.
This project demonstrates how to implement a Metamatic State Container with One-Way-Events implementation strategy.
The difference between a *One-Way-Events* state container and a *Two-Way-Events* state container is that in the *One-Way-Events* model the events
flow only into one direction, which is downstream only, from the container downwards to the UI components. In *One-Way-Events* model the communication flow
back from the UI components takes place through direct method invocation. On the contrary, in the *Two-Way-Events* model, also the upstream communication 
from the UI components back to the container is implemented through events. The *Two-Way-Events* model makes the application logic flow more difficult to
follow and oftentimes does not offer any practical benefit over the *One-Way-Events* model.

Read more about the topic on the [blog article about state container implementation strategies](http://www.oppikone.fi/blog/implementing-metamatic-state-container.html).

## Comparison of the Approaches

Let's look in detail how the **One-Way-Events** strategy differs frem the **Two-Way-Events* strategy.

## **One-Way-Events** model

The *One-Way-Events* implementation example of the Metamatic State Container, the MetaStore:

```js
const metaStore = {
  carData: null,
  cars: null,
  loggedIn: false,
  lastCarModel: null,
  activeCarModel: null,
  carModelFilter: ''
};

export const filterCarModels = (filter) => {
  metaStore.carModelFilter = filter;
  const filteredModels = CarModelService.filterByModel(metaStore.cars, filter);
  dispatch(CAR_LIST_CHANGE, filteredModels);
}

export const selectCarModel = (carModelId) => {
  metaStore.activeCarModel = carModelId;
  dispatch(CAR_MODEL_SELECTION_CHANGE, metaStore.activeCarModel);
};

... 
```
The idea is that placing data to into the state container is done by direct function invocation. The MetaStore then executes needed operations of those
placement functions and then finally broadcasts the results by dispatching a change event into the bit space.

When a UI component wants to invoke the state container it will only need to import the function and then invoke it.


## Installing the Frontend

First of all, make sure you have Node installed!

In project folder type:

```js
npm install
```

And then run the app:

```js
npm start
```

## Installing the Backend

The app will only work when the  mock car data server is up and running. To start the server,
navigate to the server directory:

```js
cd src/server
```

Then install the packages needed by the server:

```js
npm install
```

And finally run the server:

```js
node car-server.js
```
    
## License

Apache 2.0
