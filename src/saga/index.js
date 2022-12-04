import { all, fork } from 'redux-saga/effects';
import getMoviesList from './getMoviesList';
import getTvList from './getTvList';
import getsimilarList from './similarMovie';
import getMoviesCarouselList from './getMoviesCarouselList';

const arrFork = [
  fork(getMoviesList),
  fork(getTvList),
  fork(getsimilarList),
  fork(getMoviesCarouselList),
];
function* rootSaga() {
  yield all(arrFork);
}

export default rootSaga;
