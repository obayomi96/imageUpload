 
import { combineReducers } from 'redux';
import { imageReducer } from './imageReducer';

const rootReducers = combineReducers({
  image: imageReducer,
});

export default rootReducers;
