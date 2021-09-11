const initCarts ={
    carts: localStorage.getItem('gioHangDemo') ? JSON.parse(localStorage.getItem('gioHangDemo')) : []
}
 // {} // [] 
export const GioHangReducer = (state = initCarts, action)=>{
    switch (action.type) {
        case 'ADDCART':{
            var product = action.product;
            localStorage.setItem('gioHangDemo', JSON.stringify(product));
            console.log("LOCAL",JSON.parse(localStorage.getItem('gioHangDemo')));
            state.carts = JSON.parse(localStorage.getItem('gioHangDemo'));
            return {...state};
        } break;
        default:{
            return {...state};
        }
    }
} 