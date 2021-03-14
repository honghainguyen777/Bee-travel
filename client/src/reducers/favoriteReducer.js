import { FETCH_FARVORITE_CITIES, ADDED_FAVORITE_CITY, DELETED_FAVORITE_CITY } from '../actions/types';

const favoriteReducer = (state={}, action) => {
    switch (action.type) {
        case FETCH_FARVORITE_CITIES:
            console.log('FETCH_FARVORITE_CITIES', action.payload);
            return{
                ...state, favoriteCities: action.payload.favoriteCities
            };
        case ADDED_FAVORITE_CITY:
            console.log('ADDED_FAVORITE_CITY', action.payload.city);
            return {
                ...state, favoriteCities: state.favoriteCities.concat(action.payload.city)
            };
        case DELETED_FAVORITE_CITY:
            console.log('DELETED_FAVORITE_CITY', action.payload);
            // const copyState = {...state};
            // copyState.favoriteCities.splice(action.payload.index, 1);
            // console.log(copyState);
            return {
                ...state, favoriteCities: [
                    ...state.favoriteCities.slice(0, action.payload.index),
                    ...state.favoriteCities.slice(action.payload.index + 1)
                ],
            };
        default:
            return state;
    }
};



export default favoriteReducer;
