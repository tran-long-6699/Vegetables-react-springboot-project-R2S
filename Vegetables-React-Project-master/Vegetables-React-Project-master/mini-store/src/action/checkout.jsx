import {checkoutService} from '../service';
import {createAction} from '.'
import * as Types from './type';

export const checkout = (order)=>{
    console.log("ORDER",order)
    return (dispatch)=>{
        checkoutService.checkout(order)
            .then(resp=>{
                dispatch(createAction(Types.CHECKOUT_SUCCESS, resp.data));
            })
            .catch(err=>{
                console.log(err);
            })
    };
}