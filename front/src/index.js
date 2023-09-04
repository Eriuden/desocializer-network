import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers/indexReducer';


//dev tools
import {composeWithDevTools} from "redux-devtools-extension"
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';


const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducers, {}, composedEnhancer);

store.dispatch(getUsers())
store.dispatch(getPosts())


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);



