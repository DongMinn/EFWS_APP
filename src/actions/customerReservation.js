import * as types from './ActionTypes';
import axios from 'axios';



export const customerReservationGetDataRequest = (id, cellPhone) => {
    return (dispatch) => {
        //login api  시작
        dispatch(customerReserveGetData());
        return axios.post('/table/reservation/store/waiting-information-bycase/find', {
            loginId: id,
            customerCellphone: cellPhone
        }).then((response) => {
            
            if (response.status === 200) {
                if (response.data.status === 200) {
                    if(response.data.reservationOrderTime === undefined){
                        //예약데이터가 없는 경우에는 이쪽으로 들어가게 되니까 여기서 처리 해줘야 함
                        return -1;
                    }
                    dispatch(customerReserveGetDataSuccess(response.data));

                    // console.log('예약 데이터 불러오기 성공')
                    return true;

                }
            }
        }).catch((error) => {
            dispatch(customerReserveGetDataFailure());
            console.log('Reserve request failed!');
            return false;
        });
    }
}
export const customerLoginRequest = (id , cellPhone) =>{
    return (dispatch)=>{
        dispatch(customerLogin());
        return axios.post('/login/customer',{
            loginId:id,
            customerCellphone:cellPhone
        }).then((response)=>{
            if (response.status === 200) {
                if (response.data.status === 200) {
                    dispatch(customerLoginRequestSuccess(response.headers.authorization));
                    return true;
                }
            }
            else {
                dispatch(customerLoginRequestFailure());
                return false;
            }
        }).catch((error)=>{
            dispatch(customerLoginRequestFailure());
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

export const customerLogin = ()=>({
    type: types.CUSTOMER_LOGIN
})

export const customerLoginRequestSuccess = (token)=>({
    type: types.CUSTOMER_LOGIN_SUCCESS,
    token
})

export const customerLoginRequestFailure = ()=>({
    type: types.CUSTOMER_LOGIN_FAILURE
})