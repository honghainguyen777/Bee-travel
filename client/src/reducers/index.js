import { combineReducers } from 'redux';
import authReducer from './authReducer';
import mapReducer from './mapReducer';
import cityDetailReducer from './cityDetailReducer';
import favoriteReducer from './favoriteReducer';

export default combineReducers({
    auth: authReducer,
    map: mapReducer,
    city: cityDetailReducer,
    favorite: favoriteReducer
});