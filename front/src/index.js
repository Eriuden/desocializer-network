import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'

//dev tools
import { reducers } from './redux/reducers/indexReducer';
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({reducer: reducers});

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



