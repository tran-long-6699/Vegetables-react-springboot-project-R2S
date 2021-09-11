import * as Types from '../../action/type'
const stateRole = {
    roles: []
};

export const RoleReducer =(state= stateRole, action)=>{
    switch (action.type) {
        case Types.GET_ALL_ROLES:{
            state.roles = action.roles;
            return {...state};
        }
        default:{
            return {...state};
        }
    }
} 