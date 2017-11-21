import * as types from './ActionTypes';
import axios from 'axios';


export const reservationGetDataRequest = (plantCode) => {
    return (dispatch) => {
        //login api  시작
        dispatch(reserveGetData());
        return axios.post('/table/reservation/store/remaining-list/find', {
            loginId: plantCode
        }).then((response) => {

            if (response.status === 200) {
                if (response.data.status === 200) {

                    if (response.data.remainingList === undefined) {
                        dispatch(reserveGetDataSuccess([]));
                        return false;
                    } else {
                        dispatch(reserveGetDataSuccess(response.data.remainingList));
                        // console.log('예약 데이터 불러오기 성공')
                        return true;
                    }
                }
            }

        }).catch((error) => {

            dispatch(reserveGetDataFailure());
            console.log('DEBUG: Reserve request failed!');
            if (error.response.data.status === 500) {

                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }
            }
            return false;
        });
    }
}

export const reservationUpdateRequest = (id, reservationNo, state) => {
    return (dispatch) => {

        dispatch(reserveUpdateData());
        return axios.post('/table/reservation/store/update', {
            loginId: id,
            reservationNo: reservationNo,
            waitingState: state
        }).then(
            response => {

                if (response.status === 200) {

                    dispatch(reserveUpdateDataSuccess());
                    return true;
                }
            }).catch(error => {

               
                dispatch(reserveUpdateDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
                console.log('DEBUG: reservation.action 예약데이터 상태변경실패 ');
                return false;
            })
    }
}

export const reservationPutRequest = (id, reserveData) => {
    return (dispatch) => {
        dispatch(reservePutData());
        return axios.post('/table/reservation/store/save', {
            loginId: id,
            client: 'ADMINWEB',
            customerCellphone: reserveData.customerCellphone,
            tableType: reserveData.tableType
        }).then(
            response => {
                if (response.status === 201) {

                    dispatch(reservePutDataSuccess(response.data.reservationNo));
                    return true;
                } else {

                    console.log('DEBUG: reservation.action 예약데이터 생성 201 이외 상태 받음');
                    return false;
                }
            }).catch(
            error => {

                dispatch(reservePutDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
                console.log('DEBUG: reservation.action 예약데이터 생성 실패');
                return false;
            })
    }
}

export const reservationGetTotalDataRequest = (id) => {
    return (dispatch) => {

        dispatch(reserveGetTotalData());
        return axios.post('/table/reservation/store/waiting-information-total/find', {
            loginId: id
        }).then(
            response => {

                if (response.status === 200) {
                    if (response.data.status === 200) {

                        dispatch(reserveGetTotalDataSuccess(response.data.waitingInformationListDto));
                        return true;
                    }
                } else {
                    console.log('DEBUG: reservation.action 예약종합데이터 조회실패');
                    return false;
                }
            }).catch(
            error => {

                dispatch(reserveGetTotalDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
                console.log('DEBUG: reservation.action 예약종합데이터 조회 응답실패');
                return false;
            })
    }

}

export const reservationGetByTableDataRequest = (id) => {
    return (dispatch) => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (dd < 10) {
            dd = "0" + dd;
        }
        let dates = yyyy + '-' + mm + '-' + dd


        dispatch(reserveGetByTableData())

        return axios.post('/table/reservation/store/find', {
            loginId: id,
            reservationNo: null,
            waitingNo: null,
            tableTypeList: [
                { tableType: "2" },
                { tableType: "4" },
                { tableType: "6" },
                { tableType: "8" },
                { tableType: "9" }
            ],
            waitingStateList: [
                {
                    waitingState: "ENTRANCE"
                },
                {
                    waitingState: "WAIT"
                }],

            reservationOrderTimeBegin: dates,
            reservationOrderTimeEnd: dates
        }).then(
            response => {


                if (response.status === 200) {
                    if (response.data.status === 200) {

                        dispatch(reserveGetByTableDataSuccess(response.data.reservationList));
                        return true;
                    }
                } else {
                    console.log('DEBUG: reservation.action 테이블별데이터조회실패');
                    return false;
                }
            }
            ).catch(
            error => {


                dispatch(reserveGetByTableDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
                console.log('DEBUG: reservation.action 테이블별데이터조회실패');
                return false;
            })
    }
}

export const reservationGetStateDataRequest = (id , state) => {
    
    return (dispatch) => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (dd < 10) {
            dd = "0" + dd;
        }
        let dates = yyyy + '-' + mm + '-' + dd


        dispatch(reserveGetStateData())

        return axios.post('/table/reservation/store/find', {
            loginId: id,
            reservationNo: null,
            waitingNo: null,
            tableTypeList: [
                { tableType: "2" },
                { tableType: "4" },
                { tableType: "6" },
                { tableType: "8" },
                { tableType: "9" }
            ],
            waitingStateList: [
                {
                    waitingState: state
                }],
            reservationOrderTimeBegin: dates,
            reservationOrderTimeEnd: dates
        }).then(
            response => {
                
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        console.log(state)
                        
                        if(state==='NOSHOW') {
                            
                            dispatch(reserveGetNOSHOWDataSuccess(response.data.reservationList));
                        }
                        else if(state==='CANCEL') {
                            
                            dispatch(reserveGetCANCELDataSuccess(response.data.reservationList));
                        } 
                        
                        return true;
                    }
                } else {
                    console.log('DEBUG: reservation.action 상태데이터조회실패');
                    return false;
                }
            }
            ).catch(
            error => {
                dispatch(reserveGetStateDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
                console.log('DEBUG: reservation.action 상태데이터조회실패');
                return false;
            })
    }
}

export const reservationHistoryGetDataRequest = (plantCode) => {
    return (dispatch) => {
        //login api  시작
        dispatch(reserveGetData());
        return axios.post('/table/reservation/store/remaining-list/find', {
            loginId: plantCode
        }).then((response) => {

            if (response.status === 200) {
                if (response.data.status === 200) {

                    if (response.data.remainingList === undefined) {
                        dispatch(reserveGetDataSuccess([]));
                        return false;
                    } else {
                        dispatch(reserveGetDataSuccess(response.data.remainingList));
                        // console.log('예약 데이터 불러오기 성공')
                        return true;
                    }
                }
            }

        }).catch((error) => {

            dispatch(reserveGetDataFailure());
            console.log('DEBUG: Reserve request failed!');
            if (error.response.data.status === 500) {

                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }
            }
            return false;
        });
    }
}

export const reserveGetData = () => ({
    type: types.RESERVE_GET_DATA
})

export const reserveGetDataSuccess = (reserveData) => ({
    type: types.RESERVE_GET_DATA_SUCCESS,
    reserveData
})
export const reserveGetDataFailure = () => ({
    type: types.RESERVE_GET_DATA_FAILURE
})

export const reserveUpdateData = () => ({
    type: types.RESERVE_UPDATE_DATA
})
export const reserveUpdateDataSuccess = () => ({
    type: types.RESERVE_UPDATE_DATA_SUCCESS
})
export const reserveUpdateDataFailure = () => ({
    type: types.RESERVE_UPDATE_DATA_FAILURE
})
export const reservePutData = () => ({
    type: types.RESERVE_PUT_DATA
})
export const reservePutDataSuccess = (reservationNo) => ({
    type: types.RESERVE_PUT_DATA_SUCCESS,
    reservationNo
})
export const reservePutDataFailure = () => ({
    type: types.RESERVE_PUT_DATA_FAILURE
})
export const reserveGetTotalData = () => ({
    type: types.RESERVE_GET_TOTAL_DATA
})
export const reserveGetTotalDataSuccess = (reserveTotalData) => ({
    type: types.RESERVE_GET_TOTAL_DATA_SUCCESS,
    reserveTotalData
})
export const reserveGetTotalDataFailure = () => ({
    type: types.RESERVE_GET_TOTAL_DATA_FAILURE
})
export const reserveGetByTableData = () => ({
    type: types.RESERVE_GET_BYTABLE_DATA
})
export const reserveGetByTableDataSuccess = (tableDataList) => ({
    type: types.RESERVE_GET_BYTABLE_DATA_SUCCESS,
    tableDataList
})
export const reserveGetByTableDataFailure = () => ({
    type: types.RESERVE_GET_BYTABLE_DATA_FAILURE
})
export const reserveGetStateData = () => ({
    type: types.RESERVE_GET_STATE_DATA
})
export const reserveGetNOSHOWDataSuccess = (tableDataList) => ({
    type: types.RESERVE_GET_NOSHOW_DATA_SUCCESS,
    tableDataList
})
export const reserveGetCANCELDataSuccess = (tableDataList) => ({
    type: types.RESERVE_GET_CANCEL_DATA_SUCCESS,
    tableDataList
})
export const reserveGetStateDataFailure = () => ({
    type: types.RESERVE_GET_STATE_DATA_FAILURE
})