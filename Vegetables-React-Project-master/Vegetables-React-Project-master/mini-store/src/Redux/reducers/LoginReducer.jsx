import * as Types from '../../action/type';

let credential = localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : null;
const stateLogin ={
    credentials: credential
}

export const LoginReducer = (state = stateLogin, action)=>{
    switch(action.type){
        case Types.LOGIN_SUCCESS: {
            state.credentials = action.payload;
            return {...state}
        }; break;
        case Types.LOGOUT:{
            localStorage.removeItem('credentials');
            state.credentials = null;
            return {...state};
        }; break;
        default: {
            return state;
        }
    }
} 