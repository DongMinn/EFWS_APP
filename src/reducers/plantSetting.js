import * as types from '../actions/ActionTypes';

const initialState = {
    plantSetting: {
        status: 'EMPTY'//EXIST
    },
    status: {
        getData: '',
        updateData:'',
        getNoshow:'',
        updateNoshow:'',
        getAlarmData:'',
        updateAlarmData:''
    },
    value:{
        plantSettingList:[],
        returnMessage:'',
        updateNoshowTime:'',
        alarmTalkList:[]
    }
};
export default function plantSetting(state = initialState, action) {
    switch (action.type) {
        case types.PLANTSETTING_GET_DATA:
            return {
                ...state,
                plantSetting: {
                    ...state.plantSetting,
                    status: 'EXIST'
                },
                status: {
                    ...state.status,
                    getData: 'INIT'
                }
            };
        case types.PLANTSETTING_GET_DATA_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    getData:'SUCCESS'
                },
                value:{
                    ...state.value,
                    plantSettingList:action.plantSettingList
                }
            };
        case types.PLANTSETTING_GET_DATA_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    getData:'FAILURE'
                }
            }
        case types.PLANTSETTING_UPDATE_DATA:
            return {
                ...state,
                plantSetting: {
                    ...state.plantSetting,
                    status: 'EXIST'
                },
                status: {
                    ...state.status,
                    updateData: 'INIT'
                }
            };
        case types.PLANTSETTING_UPDATE_DATA_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    updateData:'SUCCESS'
                }
            };
        case types.PLANTSETTING_UPDATE_DATA_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    updateData:'FAILURE'
                }
            }
        case types.PLANTSETTING_UPDATE_DATA_FAILURE_BY_RESERVEDATA:
            return{
                ...state,
                status:{
                    ...state.status,
                    updateData:'FAILURE'
                },
                value:{
                    ...state.value,
                    returnMessage:action.returnMessage
                }
            }
        case types.PLANTSETTING_GET_NOSHOW_DATA:
            return{
                ...state,
                status:{
                    ...state.status,
                    getNoshow:'INIT'
                }
            }
        case types.PLANTSETTING_GET_NOSHOW_DATA_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    getNoshow:'SUCCESS'
                },
                value:{
                    ...state.value,
                    updateNoshowTime:action.noshowtime
                }
            }
        case types.PLANTSETTING_GET_NOSHOW_DATA_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    getNoshow:'FAILURE'
                }
            }
        case types.PLANTSETTING_UPDATE_NOSHOW_DATA:
            return{
                ...state,
                status:{
                    ...state.status,
                    updateNoshow:'INIT'
                }
            }
        case types.PLANTSETTING_UPDATE_NOSHOW_DATA_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    updateNoshow:'SUCCESS'
                }
            }
        case types.PLANTSETTING_UPDATE_NOSHOW_DATA_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    updateNoshow:'FAILURE'
                }
            }
        case types.PLANTSETTING_GET_ALARM_DATA:
            return{
                ...state,
                status:{
                    ...state.status,
                    getAlarmData:'INIT'
                }
            }
        case types.PLANTSETTING_GET_ALARM_DATA_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    getAlarmData:'SUCCESS'
                },
                value:{
                    ...state.value,
                    alarmTalkList:action.alarmTalkList
                }
            }
        case types.PLANTSETTING_GET_ALARM_DATA_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    getAlarmData:'FAILURE'
                }
            }
        default:
            return state;
    }
}
