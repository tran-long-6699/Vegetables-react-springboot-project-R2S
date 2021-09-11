import * as Types from '../../action/type';
const checkoutinit = {
    checkout: {}
}

export const CheckoutReducer = (state = checkoutinit, action)=>{
    switch (action.type) {
        case Types.CHECKOUT_SUCCESS:{
            state.checkout = action.payload;
            return {...state};
        }; break;
    
        default:
            break;
    }
}