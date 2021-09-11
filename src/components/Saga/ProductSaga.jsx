// import axios from 'axios';
// import {call, delay, takeEvery, takeLatest, put} from 'redux-saga/effects'
// import * as Types from '../../const/ActionTypes';
 
// //  redux 2 loại action: 
// //      action => object (action thường)
// //      action => function => thường dùng để xử lí API hoặc gọi API khác.

// function * getProductsAPI(action){
// //    while(true){
// //     yield take('getTaskApiAction') // theo dõi action => xem action nào dispatch mới làm các công việc bên dưới
// //     console.log('nulosa')
// //     //Call API dispatch lên reducer...
// //    }

//     // yield delay(3000);
//     // console.log('getTaskApi', action);

//     //Put giống dispatch action
//     yield put({
//         type:'DISPLAY_LOADING'
//     })
//     yield delay(1000);

//     let {data,status} = yield call(()=>{
//         return axios({
//             url: 'http://localhost:8080/veg/api/product',
//             method:'GET'
//         })
//     })

//     yield put({
//         type: Types.GET_ALL_PRODUCTS,
//         products: data
//     })

//     yield put({
//         type: 'HIDE_LOADING'
//     })
// }

// export function * ActionGetProduct(){
//     yield takeLatest('GET_ALL_PRODUCTS_ACTION', getProductsAPI)
// }