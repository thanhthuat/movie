import { call, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import * as types from '../redux/types';
import tmdbApi from '../api/tmdbApi';
function* getMoviesList({ payload, callback }) {
  try {
    const res = yield call(tmdbApi.getMoviesList, payload.type, payload.params);
    if (Array.isArray(res.results)) {
      yield put({
        type: types.GET_MOVIES_LIST.SUCCESS,
        payload: { data: res?.results || [] },
      });
      callback && callback(true, res?.results);
    } else {
      yield put({
        type: types.GET_MOVIES_LIST.FAILURE,
        payload: { error: res || {} },
      });
      callback && callback(false, res);
    }
  } catch (error) {
    console.error(error);
    callback && callback(false, { message: 'Lỗi kết nối server' });
    // yield put({ type: types.SERVER_ERROR_API });
  } finally {
    // yield put({ type: types.GET_ADD_FUND_INFO_REFRESH });
  }
}

export default function* watchAction() {
  yield takeEvery(types.GET_MOVIES_LIST.REQUEST, getMoviesList);
}
