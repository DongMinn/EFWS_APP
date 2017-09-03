import * as types from '../actions/ActionTypes';

const initialState = {
    customerReserve: {
        status: 'EMPTY'//EXIST
    },
    status: {
        getData: '',
        updateData:'',
        login:''
    },
    value:{
        customerReserveData:{},
        token:''
    }
};
export default function reservation(state = initialState, action) {
    switch (action.type) {
        case types.CUSTOMER_RESERVE_GET_DATA:
            return {
                ...state,
                customerReserve: {
                    ...state.customerReserve,
                    status: 'EXIST'
                },
                status: {
                    ...state.status,
                    getData: 'INIT'
                }
            };
        case types.CUSTOMER_RESERVE_GET_DATA_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    getData: 'SUCCESS'
                },
                value:{
                    ...state.value,
                    customerReserveData:action.customerReserveData
                }
                //reserveValue:action.reserveData
            };
        case types.CUSTOMER_RESERVE_GET_DATA_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    getData:'FAILURE'
                }
            };
        case types.CUSTOMER_LOGIN:
            return{
                ...state,
                status:{
                    ...state.status,
                    login:'INIT'
                }
            }
        case types.CUSTOMER_LOGIN_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    login:'SUCCESS'
                },
                value:{
                    ...state.value,
                    token:action.token
                }
            }
        case types.CUSTOMER_LOGIN_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    login:'FAILURE'
                }
            }
        default:
            return state;
    }
}
