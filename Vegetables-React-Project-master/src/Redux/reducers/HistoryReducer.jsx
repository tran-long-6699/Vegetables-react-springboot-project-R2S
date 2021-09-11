const historyState ={
    history:{}
}

export const HistoryReducer = (state = historyState, action) =>{
    switch (action.type) {
        case 'ADD_HISTORY':{
            state.history = action.history;
            console.log("State", state.history)
            return {...state};        
        } break;
    
        default:{
            return {...state};
        }
    }
}
