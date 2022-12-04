import apiPGServiceClient from "api/lib/apiPGServiceClient";
import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "redux/types";

function* getAddFundInfoSaga({ callback, payload }) {
  try {
    const res = yield call(
      apiPGServiceClient.callGAPI,
      "POST",
      payload,
      "/deposit"
    );

    if (res.code === 128000) {
      yield put({
        type: types.GET_ADD_FUND_INFO_SUCCESS,
        payload: { data: res },
      });
      callback && callback(true, res);
    } else {
      yield put({
        type: types.GET_ADD_FUND_INFO_FAILURE,
        payload: { error: res },
      });
      callback && callback(false, res);
    }
  } catch (error) {
    console.error(error);
    callback && callback(false, { message: "Lỗi kết nối server" });
   // yield put({ type: types.SERVER_ERROR_API });
  } finally {
   // yield put({ type: types.GET_ADD_FUND_INFO_REFRESH });
  }
}

export default function* watchAction() {
  yield takeLatest(types.GET_ADD_FUND_INFO_REQUEST, getAddFundInfoSaga);
}