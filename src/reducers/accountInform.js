import * as types from '../actions/ActionTypes';




export default function accountInform(state={} , action){
  switch (action.type) {
    case types.LOAD:
      return {
          ...state,
          data: action.data
      }
    case types.DELDATA:
      return undefined;
    case types.LOAD_ALARM:
      return{
        ...state,
        alarmData:action.data
      }
    default:
      return state;
  }
};


/**
 * Simulates data loaded into this reducer from somewhere
 */



