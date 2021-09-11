import { call, takeLatest, put, delay } from "redux-saga/effects";
import { productService } from "../../../service/ProductService";
import * as Types from "../../../const/ActionTypes";
import * as types from "../../../action/type";
import * as System from "../../../libs/const/system";
import * as ActionProduct from '../../../action/ProductAction/product';

function* getProductsAPI(action) {
  yield put({
    type: types.DISPLAY_LOADING,
  });
  try {
    let { data, status } = yield call(productService.getProductApi);
    delay(1000);
    if (status === System.STATUS.SUCCESS) {
      yield put({
        type: Types.GET_ALL_PRODUCTS,
        products: data,
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

function* getProductsByCategoryAPI(action) {
  let { data, status } = yield call(productService.getProductByCategoryApi);

  yield put({
    type: Types.LOAD_PRODUCT_BY_CATEGORY,
    products: data,
  });
}

export function* ActionGetProduct() {
  yield takeLatest(ActionProduct.GET_ALL_PRODUCTS_ACTION, getProductsAPI);
}

export function* ActionGetProductByCategory() {
  yield takeLatest(
    ActionProduct.GET_ALL_PRODUCTS_BY_CATEGORY_ACTION,
    getProductsByCategoryAPI
  );
}
