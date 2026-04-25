import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import rootReducer from './reducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// what is thunk in redux?
// Thunk is a middleware in Redux that allows you to write action creators that return
// a function instead of an action. This is particularly useful for handling asynchronous operations,
// such as API calls. With thunk, you can dispatch actions before and after the asynchronous
// operation, allowing you to manage loading states and handle success or failure responses effectively.
