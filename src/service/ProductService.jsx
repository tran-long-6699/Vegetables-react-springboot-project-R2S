import axios from 'axios';
import * as product from '../action/product';

export class ProductService{

    getProductApi = ()=>{
        return axios({
            url: product.PRODUCT_API,
            method:'GET'
        })
    }

    getProductByCategoryApi = (categoryid)=>{
        return axios({
            url: `${product.PRODUCT_API}/${categoryid}`,
            method:'GET'
        })
    }
}
export const productService = new ProductService();