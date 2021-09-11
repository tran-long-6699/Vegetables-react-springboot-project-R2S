import {all} from 'redux-saga/effects';
import * as ProductSaga from './Product/ProductSaga';
import * as RoleSaga from './Roles/RolesSaga';
import * as AuthoritiesSaga from './Roles/AuthoritiesSaga';
import * as UsersSaga from './Users/UsersSaga';
import * as ProviderSaga from './Provider/ProviderSaga';

export function * rootSaga(){
    // yield fork(getProductsAPI); // None blocking, bất đồng bộ, chạy ko cần chờ
    // yield takeEvery('getTaskApiAction', getProductsAPI)
    // yield takeLatest('getTaskApiAction', getProductsAPI) 
    yield all([
        //Nghiệp vụ theo dõi các action saga sản phẩm
        ProductSaga.ActionGetProduct(),
        RoleSaga.ActionGetRoles(),
        
        AuthoritiesSaga.ActionGetAuthorities(),
        AuthoritiesSaga.ActionGetUser(),
        AuthoritiesSaga.ActionAddAuthorities(),
        AuthoritiesSaga.ActionDeleteAuthorities(),

        UsersSaga.ActionGetUser(),
        UsersSaga.ActionAddUser(),
        UsersSaga.ActionUpdateUser(),
        UsersSaga.ActionDeleteUser(),
        // UsersSaga.ActionLogOut(),
        // UsersSaga.ActionLoginAPI(),

        ProviderSaga.ActionGetProvider(),
        ProviderSaga.ActionAddProvider(),
        ProviderSaga.ActionUpdateProvider(),
        ProviderSaga.ActionDeleteProvider()
    ])

}