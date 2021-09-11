import * as Types from '../../action/type';
const authoritiesInit = {
    authorities: []
}

export const AuthoritiesReducer = (state=authoritiesInit, action)=>{
    switch (action.type) {
        case Types.GET_ALL_AUTHORITIES:{
            state.authorities = action.authorities;
            console.log("REDUCER AUTHORITIES", state.authorities)
            return {...state};
        }
        // case Types.GET_ALL_USERS:{
        //     console.log("USERS REDUCER", action)
        //     state.users = action.users;
        //     return {...state};
        // }
        case Types.ADD_AUTHORITIES:{
            return {...state}
        }
        case Types.DELETE_AUTHORITIES:{
            return {...state}
        }
        default:{
            return {...state};
        }
    }
}