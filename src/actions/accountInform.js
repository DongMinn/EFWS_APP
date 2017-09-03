import * as types from './ActionTypes';


export const load = (data) => ({ 
    type: types.LOAD, 
    data 
})
export const delData=()=>({
    type: types.DELDATA
})
export const loadAlarm = (data)=>({
    type:types.LOAD_ALARM,
    data
})

