import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers/indexReducer';
import usersReducer from './reducers/users.reducer';

//dev tools
import {composeWithDevTools} from "redux-devtools-extension"
import logger from 'redux-logger';
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';


const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducers, {}, composedEnhancer);

store.dispatch(getUsers())
store.dispatch(getPosts())


ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

