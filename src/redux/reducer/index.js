import { combineReducers } from 'redux';
import getMovieList from './getMovieList';
import getMovieCarouselList from './getMovieCarouselList';
const appreducer = combineReducers({
    getMovieList:getMovieList,
    getMovieCarouselList:getMovieCarouselList,
})

export default appreducer