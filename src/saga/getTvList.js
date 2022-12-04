import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../redux/types';
import tmdbApi from '../api/tmdbApi';
function* getTvList({ payload, callback }) {
  try {
    const res = yield call(tmdbApi.getTvList, payload.type, payload.params);

  
    callback && callback(true, res?.results);
  } catch (error) {
    console.error(error);
    callback && callback(false, { message: 'Lỗi kết nối server' });
    // yield put({ type: types.SERVER_ERROR_API });
  } finally {
    // yield put({ type: types._REFRESH });
  }
}

export default function* watchAction() {
  yield takeEvery(types.GET_TV_LIST.REQUEST, getTvList);
}
