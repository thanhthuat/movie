
import  * as types from '../types/index';
export function getMovieList(data, callback) {
    return {
      type: types.GET_MOVIES_LIST.REQUEST,
      payload: data,
      callback,
    };
  }

  export function getMovieCarouselList(data, callback) {
    return {
      type: types.GET_MOVIES_CAROUSEL_LIST.REQUEST,
      payload: data,
      callback,
    };
  }
  export function getTvList(data, callback) {
    return {
      type: types.GET_TV_LIST.REQUEST,
      payload: data,
      callback,
    };
  }

  export function getSimilarList(data, callback) {
    return {
      type: types.GET_SIMILAR_LIST.REQUEST,
      payload: data,
      callback,
    };
  }