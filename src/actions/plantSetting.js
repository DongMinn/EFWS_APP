import * as types from './ActionTypes';
import axios from 'axios';


export const plantSettingGetDataRequest = (id) => {
    return (dispatch) => {
        //login api  시작
        dispatch(plantSettingGetData());
        return axios.post('/table/plant/setting/find', {
            loginId: id
        }).then((response) => {

            if (response.status === 200) {
                if (response.data.status === 200) {
                    if (response.data.listTablePlantSettingEntity === undefined) {
                        dispatch(plantSettingGetDataSuccess([]));
                        // console.log('예약 데이터 불러오기 성공')
                        return false;
                    } else {
                        
                        dispatch(plantSettingGetDataSuccess(response.data.listTablePlantSettingEntity));
                        // console.log('예약 데이터 불러오기 성공')
                        return true;
                    }
                }
            }
        }).catch((error) => {

            dispatch(plantSettingGetDataFailure());
            
            if (error.response.data.status === 500) {
                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }
            }
            console.log('DEBUG: plantSetting Get request failed!');
            return false;
        });
    }
}

export const plantSettingUpdateDataRequest = (id, plantSettingList) => {
    return (dispatch) => {

        dispatch(plantSettingUpdateData());
        return axios.post('/table/plant/setting/update', {
            loginId: id,
            listTablePlantSettingListDto: plantSettingList
        }).then((response) => {

            if (response.status === 200) {
                if (response.data.status === 200) {
                    
                    dispatch(plantSettingUpdateDataSuccess());
                    return true;
                } else {
                    dispatch(plantSettingUpdateDataFailure());
                    return false;
                }
            }
        }).catch((error) => {

            dispatch(plantSettingUpdateDataFailure());
            
            if (error.response.data.status === 500) {
                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }
            } else if (error.response.data.status === 400) {
                
                dispatch(plantSettingUpdateDataFailureByReserveData(error.response.data.message));
            }
            console.log('DEBUG: plantSetting Update request failed!');
            return false;
        })
    }
}
export const plantSettingGetTimeDataRequest = (loginId) => {
    return (dispatch) => {
     
        dispatch(plantSettingGetTimeData());
        return axios.post('/plant/setting/common/find', {
            loginId: loginId
        }).then(
            response => {
                
                if (response.status === 200 && response.data.status === 200) {
                    dispatch(plantSettingGetTimeDataSuccess(response.data.updateNoshowTime, response.data.maxTotalWaitTime, response.data.didBluetoothUse , response.data.alarmtalkUse));
                    return true;
                } else {
                    return false;
                }
            }
            ).catch(
            error => {
                dispatch(plantSettingGetTimeDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
                console.log('DEBUG: plantSetting noshow request failed!');
                return false;
            }
            )
    }
}
export const plantSettingUpdateTimeDataRequest = (loginId, updateNoshowTime , maxTime, didCheck , alaCheck) => {
    return (dispatch) => {
        dispatch(plantSettingUpdateTimeData());

     
        return axios.post('/plant/setting/common/update', {
            loginId: loginId,
            updateNoshowTime: updateNoshowTime,
            maxTotalWaitTime: maxTime,
            didBluetoothUse: didCheck,
            alarmtalkUse:alaCheck
        }).then(
            response => {

              
                if (response.status === 200 && response.data.status === 200) {
                    dispatch(plantSettingUpdateTimeDataSuccess());
                    return true;
                } else {
                    return false;
                }
            }
            ).catch(
            error => {
           
                dispatch(plantSettingUpdateTimeDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
                console.log('DEBUG: plantSetting noshow update failed!');
                return false;
            }
            )
    }
}
export const plantSettingGetAlarmDataRequest = (loginId)=>{
    return (dispatch)=>{
        dispatch(plantSettingGetAlarmData());

        return axios.post('/plant/setting/alarmtalk/find' , {
            loginId:loginId
        }).then(
            response=>{
                if(response.status===200 && response.data.status===200){
                    
                    dispatch(plantSettingGetAlarmDataSuccess(response.data.alarmTalkList));
                    return true;
                }
            }
        ).catch(
            error=>{
                dispatch(plantSettingGetAlarmDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
                console.log('DEBUG: plantSetting alarm request failed!');
                return false;
            }
        )
    }
}
export const plantSettingUpdateAlarmDataRequest = (loginId , alarmList)=>{
    return (dispatch)=>{
        dispatch(plantSettingUpdateAlarmData());

        return axios.post('/plant/setting/alarmtalk/update' , {
            loginId:loginId,
            alarmTalkList:alarmList
        }).then(
            response=>{
                if(response.status===200 && response.data.status===200){
                    
                    dispatch(plantSettingUpdateAlarmDataSuccess());
                    return true;
                }
            }
        ).catch(
            error=>{
                dispatch(plantSettingUpdateAlarmDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }else if (error.response.data.status === 400) {
                    
                    dispatch(plantSettingUpdateDataFailureByAlarmData(error.response.data.message));
                }
                console.log('DEBUG: plantSetting alarm update failed!');
                return false;
            }
        )
    }
}


export const plantSettingGetData = () => ({
    type: types.PLANTSETTING_GET_DATA
})

export const plantSettingGetDataSuccess = (plantSettingList) => ({
    type: types.PLANTSETTING_GET_DATA_SUCCESS,
    plantSettingList
})

export const plantSettingGetDataFailure = () => ({
    type: types.PLANTSETTING_GET_DATA_FAILURE
})

export const plantSettingUpdateData = () => ({
    type: types.PLANTSETTING_UPDATE_DATA
})

export const plantSettingUpdateDataSuccess = () => ({
    type: types.PLANTSETTING_UPDATE_DATA_SUCCESS
})

export const plantSettingUpdateDataFailure = () => ({
    type: types.PLANTSETTING_UPDATE_DATA_FAILURE
})
export const plantSettingUpdateDataFailureByReserveData = (returnMessage) => ({
    type: types.PLANTSETTING_UPDATE_DATA_FAILURE_BY_RESERVEDATA,
    returnMessage
})
export const plantSettingGetTimeData = () => ({
    type: types.PLANTSETTING_GET_NOSHOW_DATA
})
export const plantSettingGetTimeDataSuccess = (noshowtime , maxtime , didCheck, alaCheck) => ({
    type: types.PLANTSETTING_GET_NOSHOW_DATA_SUCCESS,
    noshowtime,
    maxtime,
    didCheck,
    alaCheck
})
export const plantSettingGetTimeDataFailure = () => ({
    type: types.PLANTSETTING_GET_NOSHOW_DATA_FAILURE
})
export const plantSettingUpdateTimeData = () => ({
    type: types.PLANTSETTING_UPDATE_NOSHOW_DATA
})
export const plantSettingUpdateTimeDataSuccess = () => ({
    type: types.PLANTSETTING_UPDATE_NOSHOW_DATA_SUCCESS
})
export const plantSettingUpdateTimeDataFailure = () => ({
    type: types.PLANTSETTING_UPDATE_NOSHOW_DATA_FAILURE
})
export const plantSettingGetAlarmData = ()=>({
    type:types.PLANTSETTING_GET_ALARM_DATA
})
export const plantSettingGetAlarmDataSuccess = (alarmTalkList)=>({
    type:types.PLANTSETTING_GET_ALARM_DATA_SUCCESS,
    alarmTalkList
})
export const plantSettingGetAlarmDataFailure = ()=>({
    type:types.PLANTSETTING_GET_ALARM_DATA_FAILURE
})
export const plantSettingUpdateAlarmData=()=>({
    type:types.PLANTSETTING_UPDATE_ALARM_DATA
})
export const plantSettingUpdateAlarmDataSuccess=()=>({
    type:types.PLANTSETTING_UPDATE_ALARM_DATA_SUCCESS
})
export const plantSettingUpdateAlarmDataFailure=()=>({
    type:types.PLANTSETTING_UPDATE_ALARM_DATA_FAILURE
})
export const plantSettingUpdateDataFailureByAlarmData=(returnMessage)=>({
    type:types.PLANTSETTING_UPDATE_DATA_FAILURE_BY_ALARMDATA,
    returnMessage
})