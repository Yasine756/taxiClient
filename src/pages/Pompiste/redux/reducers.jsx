// rootReducer.js
import { combineReducers } from 'redux';
import PompisteReducer from './reducer';  // Correct reducer import

// Combine reducers (if there are more reducers, add them here)
export  const  rootReducer= combineReducers({
  pompiste: PompisteReducer,  
});
