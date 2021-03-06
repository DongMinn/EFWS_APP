import * as types from '../actions/ActionTypes';

const initialState = {
    reserve: {
        status: 'EMPTY'//EXIST
    },
    status: {
        getData: '',
        getTotalData: '',
        updateData: '',
        putData: '',
        getByTableData: '',
        getStateData: '',
        getHistoryData:''
    },
    reservationNo: '',
    reserveValue: [],
    reserveTotalValue: [],
    beforeCallList: [],
    noshowList: [],
    cancelList: [],
    historyList:[]

};
export default function reservation(state = initialState, action) {
    switch (action.type) {
        case types.RESERVE_GET_DATA:
            return {
                ...state,
                reserve: {
                    ...state.reserve,
                    status: 'EXIST'
                },
                status: {
                    ...state.status,
                    getData: 'INIT'
                }
            };
        case types.RESERVE_GET_DATA_SUCCESS:
            return {                                                                                                                                                                     
                ...state,
                status: {
                    ...state.status,
                    getData: 'SUCCESS'
                },
                // value:[...state ,action.reserveData]
                reserveValue: action.reserveData
            };
        case types.RESERVE_GET_DATA_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    getData: 'FAILURE'
                }
            };
        case types.RESERVE_UPDATE_DATA:
            return {
                ...state,
                status: {
                    ...state.status,
                    updateData: 'INIT'
                }
            };
        case types.RESERVE_UPDATE_DATA_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    updateData: 'SUCCESS'
                }
            };
        case types.RESERVE_UPDATE_DATA_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    updateData: 'FAILURE'
                }
            }
        case types.RESERVE_PUT_DATA:
            return {
                ...state,
                status: {
                    ...state.status,
                    putData: 'INIT'
                }
            };
        case types.RESERVE_PUT_DATA_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    putData: 'SUCCESS'
                },
                reservationNo: action.reservationNo
            };
        case types.RESERVE_PUT_DATA_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    putData: 'FAILURE'
                }
            };
        case types.RESERVE_GET_TOTAL_DATA:
            return {
                ...state,
                status: {
                    ...state.status,
                    getTotalData: 'INIT'
                }
            };
        case types.RESERVE_GET_TOTAL_DATA_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    getTotalData: 'SUCCESS'
                },
                reserveTotalValue: action.reserveTotalData
            };
        case types.RESERVE_GET_TOTAL_DATA_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    getTotalData: 'FAILURE'
                }
            };
        case types.RESERVE_GET_BYTABLE_DATA:
            return {
                ...state,
                status: {
                    ...state.status,
                    getByTableData: 'INIT'
                }
            };
        case types.RESERVE_GET_BYTABLE_DATA_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    getByTableData: 'SUCCESS'
                },
                beforeCallList: action.tableDataList
            };
        case types.RESERVE_GET_BYTABLE_DATA_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    getByTableData: 'FAILURE'
                }
            };
        case types.RESERVE_GET_STATE_DATA:
            return {
                ...state,
                status: {
                    ...state.status,
                    getStateData: 'INIT'
                }
            };
        case types.RESERVE_GET_NOSHOW_DATA_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    getStateData: 'SUCCESS'
                },
                noshowList: action.tableDataList
            };
        case types.RESERVE_GET_CANCEL_DATA_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    getStateData: 'SUCCESS'
                },
                cancelList: action.tableDataList
            };
        case types.RESERVE_GET_STATE_DATA_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    getStateData: 'FAILURE'
                }
            };
            case types.RESERVE_GET_HISTORY_DATA:
            return{
                ...state,
                status:{
                    ...state.status,
                    getHistoryData:'INIT'
                }
            };
        case types.RESERVE_GET_HISTORY_DATA_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    getHistoryData:'SUCCESS'
                },
                historyList:action.historyList
            };
        case types.RESERVE_GET_HISTORY_DATA_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    getHistoryData:'FAILURE'
                }
            };
        default:
            return state;
    }
}
