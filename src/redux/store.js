// src/redux/store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';

// Combiner tous les reducers (si vous avez plusieurs reducers, vous pouvez les ajouter ici)
const rootReducer = combineReducers({
  auth: authReducer, // Reducer pour l'authentification
});

// Créer le store Redux
const store = createStore(rootReducer);

export default store;
