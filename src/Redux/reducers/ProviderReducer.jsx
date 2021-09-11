import * as Types from '../../action/type';

const providerInit ={
    providers:[]
}

export const ProviderReducer = (state = providerInit, action)=>{
    switch (action.type) {
        case Types.GET_ALL_PROVIDERS:{
            state.providers = action.providers;
            return {...state};
        }
        default:{
            return {...state};
        }
    }
}