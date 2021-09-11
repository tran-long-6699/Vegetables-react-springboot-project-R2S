import { call, takeLatest, put, delay } from "redux-saga/effects";
import { rolesService } from "../../../service/RolesService";
import * as types from "../../../action/type";
import * as system from "../../../libs/const/system";
import * as AuthoritiesAction from '../../../action/RolesAction/authorize';
function * getRolesAPI(action) {
  yield put({
    type: types.DISPLAY_LOADING,
  });
  delay(1000);
  try {
    let { data, status } = yield call(rolesService.getAllRolesAPI);
    if (status === system.STATUS.SUCCESS) {
      yield put({
        type: types.GET_ALL_ROLES,
        roles: data,
      });
    }else{
        console.log("Error");
    }
  } catch (error) {
      console.log("Error", error);
  }
  yield put({
    type: types.HIDE_LOADING,
  });
}

export function* ActionGetRoles() {
  yield takeLatest(AuthoritiesAction.GET_ALL_ROLES_ACTION, getRolesAPI);
}
