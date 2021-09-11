import * as Types from '../../action/type';
const userInit = {
    users: []
}

export const UserReducer = (state=userInit, action)=>{
    switch (action.type) {
        case Types.GET_ALL_USERS:{
            state.users = action.users;
            console.log("USER REDUCER: ",state.users)
            return {...state};
        }
        default:{
            return {...state};
        }
    }
}