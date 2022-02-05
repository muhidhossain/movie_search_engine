import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import searchReducer from './searchReducer';

const allReducers = combineReducers({
  moviesReducer: moviesReducer,
  searchReducer: searchReducer,
});

export default allReducers;
