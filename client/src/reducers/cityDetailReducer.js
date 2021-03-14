import { FETCH_CITIES, CITY_INIT, FETCH_CITY, FETCH_7DAYS_WEATHER,
    SUBMIT_VISITED_FORM, CITY_REDIRECT } from '../actions/types';

const cityDetailReducer = (state={}, action) => {
    switch (action.type) {
        case FETCH_CITY:
            console.log('FETCH_CITY', action.payload);
            const {city,summary, currentWeather, imageUrl, weatherMessage, username, currentDate} = action.payload;

            return{
                ...state, city,summary, currentWeather, imageUrl, weatherMessage, username, currentDate, cityFormSuccess: false
            };
        case FETCH_7DAYS_WEATHER:
            console.log('FETCH_7DAYS_WEATHER', action.payload);
            const { temps7Days, message } = action.payload;
            return {
                ...state, temps7Days, message
            };
        case SUBMIT_VISITED_FORM:
            console.log("SUBMIT_VISITED_FORM", action.payload);
            return {
                ...state, cityFormSuccess: action.payload.success, memory_id: action.payload.memory_id
            }
        case CITY_REDIRECT:
            console.log("Redirect in city forms");
            return {
                ...state, cityFormSuccess: false
            }
        default:
            return state;
    }
};

export default cityDetailReducer;
