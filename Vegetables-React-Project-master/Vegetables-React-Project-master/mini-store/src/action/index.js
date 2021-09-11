import * as Types from '../const/ActionTypes';
import axios from 'axios';

const PRODUCT_API_URL = 'http://localhost:8080/veg/api/product';
export const actFetchAllProductsRequest = () => {
    return async (dispath) => {
        const res = await axios.get(PRODUCT_API_URL);
        dispath(actFetchAllProducts(res.data));
        console.log(res);
    };
}

export const actFetchAllProductsByCategoryRequest = (categoryid) => {
    return async (dispath) => {
        const resp = await axios.get(`http://localhost:8080/veg/api/product/${categoryid}`);
        dispath(actFetchAllProductsByCategory(resp.data));
        console.log("Product By Category", resp);
    }
}






export const actFetchAllProducts = (products) => {
    return {
        type: Types.GET_ALL_PRODUCTS,
        products
    }
}

export const actFetchAllProductsByCategory = (products) => {
    return {
        type: Types.LOAD_PRODUCT_BY_CATEGORY,
        products
    }
}

export const createAction = (type, payload)=>({
    type,
    payload
})