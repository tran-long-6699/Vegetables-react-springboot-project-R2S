import { call, takeLatest, put, delay } from "redux-saga/effects";
import { authoritiesService } from "../../../service/AuthoritiesService";
import * as types from "../../../action/type";
import * as AuthorizeAction from "../../../action/RolesAction/authorize";
import * as System from "../../../libs/const/system";

function* getAuthoritiesAPI(action) {
  yield put({
    type: types.DISPLAY_LOADING,
  });
  delay(1000);

  try {
    let { data, status } = yield call(authoritiesService.getAllAuthoritiesAPI);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: types.GET_ALL_AUTHORITIES,
        authorities: data
      });
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error", error);
  }

  yield put({
    type: types.HIDE_LOADING,
  });
}

function * getUsersAPI(action){
  yield put({
    type: types.DISPLAY_LOADING,
  });
  delay(1000);

  try {
    let { data, status } = yield call(authoritiesService.getAllUsersAPI);
    if (status === System.STATUS.SUCCESS) {
      console.log("USERS SAGA", data)
      yield put({
        type: types.GET_ALL_USERS,
        users: data,
      });
      
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log("Error", error);
  }

  yield put({
    type: types.HIDE_LOADING,
  });
}

function * addAuthoritiesAPI(action) {
  const {authorities} = action; 
  yield put({
    type: types.DISPLAY_LOADING,
  });
  delay(1000);
  
  try {
      let {data, status} = yield call(()=>{return authoritiesService.addAuthoritiesAPI(authorities)});
      if(status === System.STATUS.SUCCESS){
        yield put({
          type: AuthorizeAction.GET_ALL_AUTHORITIES_ACTION
        });
      }else{
        console.log("Error");
      }
    } catch (error) {
      console.log("Error", error);
  }

  yield put({
      type: types.HIDE_LOADING
  });
}

function * deleteAuthoritiesAPI(action) {
  const {authorities} = action; 
  yield put({
    type: types.DISPLAY_LOADING,
  });
  delay(1000);
  
  try {
      let {status} = yield call(()=>{return authoritiesService.deleteAuthoritiesAPI(authorities)});
      if(status === System.STATUS.SUCCESS){
        console.log("DELETE SUCCESS")
        yield put({
          type: AuthorizeAction.GET_ALL_AUTHORITIES_ACTION
        });

        yield put({
          type: AuthorizeAction.GET_ALL_ROLES_ACTION
        });

        yield put({
          type: AuthorizeAction.GET_ALL_USERS_ACTION
        });

      }else{
        console.log("Error");
      }
    } catch (error) {
      console.log("Error", error);
  }

  yield put({
      type: types.HIDE_LOADING
  });
}

export function* ActionGetAuthorities() {
    yield takeLatest(
      AuthorizeAction.GET_ALL_AUTHORITIES_ACTION,
      getAuthoritiesAPI
    );
}

export function * ActionAddAuthorities(){
    yield takeLatest(
        AuthorizeAction.ADD_AUTHORITIES_ACTION,
        addAuthoritiesAPI
    );
}

export function * ActionGetUser(){
  yield takeLatest(
      AuthorizeAction.GET_ALL_USERS_ACTION,
      getUsersAPI
  );
}

export function * ActionDeleteAuthorities(){
  yield takeLatest(
    AuthorizeAction.DELETE_AUTHORITIES_ACTION,
    deleteAuthoritiesAPI
  );
}

