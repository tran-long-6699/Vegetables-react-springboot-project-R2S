import { call, takeLatest, put, delay } from "redux-saga/effects";
import { providerService } from "../../../service/ProviderService";
import * as Types from "../../../const/ActionTypes";
import * as types from "../../../action/type";
import * as System from "../../../libs/const/system";
import * as Provider from '../../../action/ProviderAction/provider';

function * getProvidersAPI(action){
    yield put({
        type: types.DISPLAY_LOADING
    })
    delay(1000);

    try {
        let {data,status} = yield call(providerService.getAllProviders)
        if(status === System.STATUS.SUCCESS){
            yield put({
                type: types.GET_ALL_PROVIDERS,
                providers: data
            })
        }else{
            console.log("Error", status)
        }
    } catch (error) {
        console.log("Error", error);
    }

    yield put({
        type: types.HIDE_LOADING
    })
}

function * addProviderAPI(action){
    const {provider} = action;
    yield put({
        type: types.DISPLAY_LOADING
    })
    delay(1000);

    try {
        let {data,status} = yield call(()=>{return providerService.addProvider(provider)})
        if(status === System.STATUS.SUCCESS){
            yield put({
                type: Provider.GET_ALL_PROVIDERS_ACTION,
            })
        }else{
            console.log("Error", status)
        }
    } catch (error) {
        console.log("Error", error);
    }

    yield put({
        type: types.HIDE_LOADING
    })
}

function * updateProviderAPI(action){
    const {provider} = action;
    yield put({
        type: types.DISPLAY_LOADING
    })
    delay(1000);

    try {
        let {data,status} = yield call(()=>{return providerService.updateProvider(provider)})
        if(status === System.STATUS.SUCCESS){
            yield put({
                type: Provider.GET_ALL_PROVIDERS_ACTION,
            })
        }else{
            console.log("Error", status)
        }
    } catch (error) {
        console.log("Error", error);
    }

    yield put({
        type: types.HIDE_LOADING
    })
}

function * deleteProviderAPI(action){
    const {provider} = action;
    yield put({
        type: types.DISPLAY_LOADING
    })
    delay(1000);

    try {
        let {data,status} = yield call(()=>{return providerService.deleteProvider(provider)})
        if(status === System.STATUS.SUCCESS){
            yield put({
                type: Provider.GET_ALL_PROVIDERS_ACTION,
            })
        }else{
            console.log("Error", status)
        }
    } catch (error) {
        console.log("Error", error);
    }

    yield put({
        type: types.HIDE_LOADING
    })
}

export function * ActionGetProvider(){
    yield takeLatest(
        Provider.GET_ALL_PROVIDERS_ACTION,
        getProvidersAPI
    )
}

export function * ActionAddProvider(){
    yield takeLatest(
        Provider.ADD_PROVIDER_ACTION,
        addProviderAPI
    )
}

export function * ActionUpdateProvider(){
    yield takeLatest(
        Provider.UPDATE_PROVIDER_ACTION,
        updateProviderAPI
    )
}

export function * ActionDeleteProvider(){
    yield takeLatest(
        Provider.DELETE_PROVIDER_ACTION,
        deleteProviderAPI
    )
}