import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';
import errorReducer from './error.reducer'
import allPostReducer from './allPost.Reducer';
import trendingReducer from './trending.reducer';


//l'appel du reducer est TOUJOURS sous forme de const, 
//il s'est pas mis à la page l'ami redux

const reducers = combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  errorReducer,
  allPostReducer,
  trendingReducer,
  
});

export default reducers