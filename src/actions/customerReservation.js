import * as types from './ActionTypes';
import axios from 'axios';



export const customerReservationGetDataRequest = (id, reservationNo) => {
    return (dispatch) => {
        //login api  시작
        dispatch(customerReserveGetData());
        return axios.post('/table/reservation/store/waiting-information-bycase/find', {
            loginId: id,
            reservationNo: reservationNo
        }).then((response) => {

            if (response.status === 200) {
                if (response.data.status === 200) {
                    dispatch(customerReserveGetDataSuccess(response.data));
                    return true;
                }
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                return -1;
            }
            dispatch(customerReserveGetDataFailure());
            console.log('DEBUG:customerReserve request failed!');
            return false;
        });
    }
}
export const customerLoginRequest = (id, reservationNo) => {
    return (dispatch) => {
        dispatch(customerLogin());
        return axios.post('/login/customer', {
            loginId: id,
            reservationNo: reservationNo
        }).then((response) => {
            if (response.status === 200) {
                if (response.data.status === 200) {
                    dispatch(customerLoginRequestSuccess(response.headers.authorization));
                    return true;
                }
            }
            else {
                dispatch(customerLoginRequestFailure());
                console.log('DEBUG:customerLogin request failed!');
                return false;
            }
        }).catch((error) => {
            dispatch(customerLoginRequestFailure());
            console.log('DEBUG:customerLogin request failed!');
            return false;
        })
    }
}

export const customerReserveGetData = () => ({
    type: types.CUSTOMER_RESERVE_GET_DATA
})
export const customerReserveGetDataSuccess = (customerReserveData) => ({
    type: types.CUSTOMER_RESERVE_GET_DATA_SUCCESS,
    customerReserveData
})
export const customerReserveGetDataFailure = () => ({
    type: types.CUSTOMER_RESERVE_GET_DATA_FAILURE
})

export const customerLogin = () => ({
    type: types.CUSTOMER_LOGIN
})

export const customerLoginRequestSuccess = (token) => ({
    type: types.CUSTOMER_LOGIN_SUCCESS,
    token
})

export const customerLoginRequestFailure = () => ({
    type: types.CUSTOMER_LOGIN_FAILURE
})