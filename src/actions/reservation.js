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
            console.log(error.response.data);
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

export const reservationUpdateRequest = (id, customerCellphone, state) => {
    return (dispatch) => {

        dispatch(reserveUpdateData());
        return axios.post('/table/reservation/store/update', {
            loginId: id,
            customerCellphone: customerCellphone,
            waitingState: state
        }).then(
            response => {
                if (response.status === 200) {
                    console.log('DEBUG: reservation.action 예약데이터 상태변경완료 ');
                    dispatch(reserveUpdateDataSuccess());
                    return true;
                }
            }).catch(error => {

                console.log('DEBUG: reservation.action 예약데이터 상태변경실패 ');
                dispatch(reserveUpdateDataFailure());
                if (error.response.data.status === 500) { 
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
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
                    console.log('DEBUG: reservation.action 예약데이터 생성완료');
                    dispatch(reservePutDataSuccess());
                    return true;
                } else {

                    console.log('DEBUG: reservation.action 예약데이터 생성 201 이외 상태 받음');
                    return false;
                }
            }).catch(
            error => {
                console.log('DEBUG: reservation.action 예약데이터 생성 실패');
                dispatch(reservePutDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
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
                        console.log('DEBUG: reservation.action 예약종합데이터 조회 완료');
                        dispatch(reserveGetTotalDataSuccess(response.data.waitingInformationListDto));
                        return true;
                    }
                } else {
                    console.log('DEBUG: reservation.action 예약종합데이터 조회실패');
                    return false;
                }
            }).catch(
            error => {

                console.log(error.response);

                console.log('DEBUG: reservation.action 예약종합데이터 조회 응답실패');
                dispatch(reserveGetTotalDataFailure());
                if (error.response.data.status === 500) {
                    if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                        return -1;
                    }
                }
                return false;
            })
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
export const reservePutDataSuccess = () => ({
    type: types.RESERVE_PUT_DATA_SUCCESS
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