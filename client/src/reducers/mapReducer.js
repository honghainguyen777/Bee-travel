import { FETCH_CITIES, CITY_INIT } from '../actions/types';

const mapReducer = (state={}, action) => {
    switch (action.type) {
        case FETCH_CITIES:
            console.log('FETCH_CITIES', action.payload);
            return{
                ...state, cities: action.payload, searched: true
            };
        case CITY_INIT:
            console.log('CITY_INIT', action.payload);
            return{
                ...state, cities: action.payload, searched: false
            };
        default:
            return state;
    }
};

export default mapReducer;

// case FETCH_USER:
//             console.log('fetch user', action.payload);
//             return {
//                 ...state, isSignedIn: true
//             };