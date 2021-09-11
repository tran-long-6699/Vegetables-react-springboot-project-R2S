import { call, takeLatest, put, delay } from "redux-saga/effects";
import * as types from "../../../action/type";
import * as system from "../../../libs/const/system";
import {userService} from '../../../service/index';
import * as Action from '../../../action/UserAction/user';
import { yellow } from "@material-ui/core/colors";

// function * loginUserAPI(action){
//     const {user} = action;
//     yield put({
//         type: types.HIDE_LOADING
//     })
//     delay(1000);

//     try {
//         let {data, status} = yield call (()=>{return userService.signIn(user)});
//         if(status === system.STATUS.SUCCESS){
//             yield put({
//                 type: types.LOGIN_SUCCESS,
//                 payload: data
//             })
//         }else{
//             console.log("Error")
//         }
//     } catch (error) {
//         console.log("Error", error);
//     }

//     yield put({
//         type: types.HIDE_LOADING
//     })
// }

function * getUsersAPI(action){
    yield put({
        type: types.DISPLAY_LOADING
    })
    delay(1000);
    
    try {
        let {data, status} = yield call(userService.getAllUsers);
        if(status === system.STATUS.SUCCESS){
            yield put({
                type: types.GET_ALL_USERS,
                users: data
            })
            console.log("DATA", data)
        }else{
            console.log("ERROR: " + status);
        }
    } catch (error) {
        console.log("Error",error)
    }

    yield put({
        type: types.HIDE_LOADING
    })
}

function * addUsersAPI(action){
    const {user} = action;
    console.log("VIEW",action)
    yield put({
        type: types.DISPLAY_LOADING
    })
    delay(1000);
    
    try {
        let {data, status} = yield call(()=>{return userService.addUser(user)});
        if(status === system.STATUS.SUCCESS){
            yield put({
                type: Action.GET_ALL_USERS_MANAGER_ACTION,
                users: data
            })
        }else{
            console.log("ERROR: " + status);
        }
    } catch (error) {
        console.log("Error",error)
    }

    yield put({
        type: types.HIDE_LOADING
    })
}

function * updateUsersAPI(action){
    const {user} = action;
    yield put({
        type: types.DISPLAY_LOADING
    })
    delay(1000);
    
    try {
        let {data, status} = yield call(()=>{return userService.updateUser(user)});
        if(status === system.STATUS.SUCCESS){
            yield put({
                type: Action.GET_ALL_USERS_MANAGER_ACTION,
            })
        }else{
            console.log("ERROR: " + status);
        }
    } catch (error) {
        console.log("Error",error)
    }

    yield put({
        type: types.HIDE_LOADING
    })
}

function * deleteUsersAPI(action){
    const {user} = action;
    yield put({
        type: types.DISPLAY_LOADING
    })
    delay(1000);
    
    try {
        let {status} = yield call(()=>{return userService.deleteUser(user)});
        if(status === system.STATUS.SUCCESS){
            yield put({
                type: Action.GET_ALL_USERS_MANAGER_ACTION,
            })
        }else{
            console.log("ERROR: " + status);
        }
    } catch (error) {
        console.log("Error",error)
    }

    yield put({
        type: types.HIDE_LOADING
    })
}

// function * logout(action){
//     console.log("Logout", action)
//     yield put({
//         type: types.DISPLAY_LOADING
//     })
//     delay(1000);
//     yield put({
//         type: types.LOGOUT
//     })
//     yield put({
//         type: types.HIDE_LOADING
//     }) 
// }

export function * ActionGetUser(){
    yield takeLatest(
        Action.GET_ALL_USERS_MANAGER_ACTION,
        getUsersAPI
    )
}

export function * ActionAddUser(){
    yield takeLatest(
        Action.ADD_USER_ACTION,
        addUsersAPI
    )
}

export function * ActionUpdateUser(){
    yield takeLatest(
        Action.UPDATE_USER_ACTION,
        updateUsersAPI
    )
}

export function * ActionDeleteUser(){
    yield takeLatest(
        Action.DELETE_USER_ACTION,
        deleteUsersAPI
    )
}

// export function * ActionLogOut(){
//     yield takeLatest(
//         Action.LOGOUT_ACTION,
//         logout
//     )
// }

// export function * ActionLoginAPI(){
//     yield takeLatest(
//         Action.LOGIN_ACTION,
//         loginUserAPI
//     )
// }

