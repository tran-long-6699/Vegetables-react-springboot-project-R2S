import {GioHangReducer} from './GioHangReducer';
import { HistoryReducer } from './HistoryReducer';
import { LoginReducer } from './LoginReducer';
import {SanPhamReducer} from './SanPhamReducer';
import LoadingReducer from './LoadingReducer';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from '../saga/rootSaga';
import { RoleReducer } from './RoleReducer';
import { AuthoritiesReducer } from './AuthoritiesReducer';
import {UserReducer} from './UserReducer';
import { ProviderReducer } from './ProviderReducer';
const saga = createMiddleWareSaga();
const rootReducer = combineReducers({
    //Nơi sẽ chứa các reducer cho nghiệp vụ (store con)
    GioHangReducer, 
    SanPhamReducer,
    LoginReducer,
    HistoryReducer,
    LoadingReducer,
    RoleReducer,
    AuthoritiesReducer,
    UserReducer,
    ProviderReducer

}) 
const store = createStore(rootReducer,
  applyMiddleware(thunk,saga)
);
saga.run(rootSaga);

export default store;