import * as types from './ActionTypes';
import axios from 'axios';
import hasha from 'js-sha512';


export const loginRequest = (id, password) => {
    return (dispatch) => {
        //login api  시작
        dispatch(login());
        return axios.post('/login', {
            loginId: id,
            //sha-512 
            password: password
        }).then((response) => {
            //여기서 토큰값도 저장해야 할듯       

            if (response.status === 200) {
                if (response.data.status === 200) {
                    console.log('DEBUG: Login Request 성공')
                    dispatch(loginSuccess(id, response.headers.authorization));
                    return true;
                }
            }
            else {
                dispatch(loginFailure());
                return false;
            }
        }).catch((error) => {
            console.log('DEBUG: Login request failed!');
            return false;
        });
    }
}

export function getStatusRequest() {
    
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());
        //로그인중인것을 확인 할 수 있는 , api 하나 서버에 두어야 할듯!!
        //지금은 임시로 사용
        return axios.post('/jwt/check')
            .then((response) => {
                //Login Successful예상
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        dispatch(getStatusSuccess());
                        return true;
                    }
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    console.log('DEBUG: JWT 토큰 만료');
                    return false;
                }
                console.log('DEBUG: JWT 토큰 체크 실패');
                dispatch(getStatusFailure());
            });
    };
}
export function checkPasswordRequest(id, password) {
    
    return (dispatch) => {
        dispatch(checkPassword());
        return axios.post('/user/password/check', {
            loginId: id,
            //sha-512 
            password: hasha(password)
        }).then((response) => {
            //체크 성공이라면,
            
            if (response.status === 200) {
                if (response.data.status === 200) {
                    dispatch(checkPasswordSuccess());
                    return true;
                }
            }
        }).catch((error) => {
            console.log('DEBUG: CheckPassword request failed!');
            dispatch(checkPasswordFailure());
            
            if (error.response.data.status === 500) {
                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }
            }
            return false;

        });
    }
}
export function changePasswordRequest(id, password, newPassword) {
    return (dispatch) => {
        dispatch(changePassword());
        return axios.post('/user/password/update', {
            loginId: id,
            //sha-512 
            password: hasha(password),
            newPassword: hasha(newPassword),
            updater: id
        }).then((response) => {
            //체크 성공이라면, 
            if (response.status === 200) {
                if (response.data.status === 200) {
                    dispatch(changePasswordSuccess());
                    return true;
                }
            }

        }).catch((error) => {
            console.log('DEBUG:ChangePassword request failed!');
            dispatch(changePasswordFailure());
            return false;
        });
    }
}

export function getInformationRequest(id) {
    return (dispatch) => {
        dispatch(getInformation());

        return axios.post('/user/find', {
            loginId: id
        }).then((response) => {
            if (response.status === 200) {
                if (response.data.status === 200) {

                    dispatch(getInformationSuccess(response.data.loginId, response.data.userRole, response.data.plantCode));
                    return true;
                }
            }

        }).catch((error) => {
            console.log('DEBUG:getInformationRequest:실패')
            dispatch(getInformationFailure());
            if (error.response.data.status === 500) {
                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }
            }
            return false;
        })
    }
}

export function getStoreInformationRequest(id) {
    return (dispatch) => {
        
        dispatch(getStoreInformation());

        return axios.post('/plant/find', {
            loginId: id
        }).then(response => {

            if (response.status === 200) {
                if (response.data.status === 200) {

                    dispatch(getStoreInformationSuccess(response.data.plantTelNo, response.data.plantName, response.data.noticeDescription));
                    return true;
                }
            }
        }).catch(error => {

            console.log('DEBUG:getStoreInformationRequest:실패')
            dispatch(getStoreInformationFailure());
            if (error.response.data.status === 500) {
                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }else{
                    return false;
                }
            }
            return false;
        })

    }
}

export function changeStoreInformationRequest(id, plantName, plantTelNo, description) {
    return (dispatch) => {
        return axios.post('/plant/update', {
            loginId: id,
            //sha-512 
            plantName: plantName,
            plantTelNo: plantTelNo,
            noticeDescription: description


        }).then((response) => {
            //체크 성공이라면, 
            if (response.status === 200) {
                if (response.data.status === 200) {
                    dispatch(changeInformationSuccess());
                    return true;
                }
            }

        }).catch((error) => {
            console.log('DEBUG:changeInformationRequest request failed!');
            dispatch(changeInformationFailure());
            if (error.response.data.status === 500) {
                if ((error.response.data.message.indexOf('JWT') >= 0) && (error.response.data.message.indexOf('expired') >= 0)) {
                    return -1;
                }
            }
            return false;
        });
    }
}

export function getStoreSettingInformRequest(id) {
    return (dispatch) => {

        return axios.post('/user/get-setting-information', {
            loginId: id
        }).then(
            response => {

              
            }
            ).catch(
            error => {
                console.log('DEBUG:getStoreSettingInformRequest 실패')
                dispatch(getStoreSettingInformFailure());
            }
            )
    }
}


export const setCurrentInform = (id, isLoggedIn, token) => ({
    type: types.AUTH_SET_CURRENTINFORM,
    id,
    isLoggedIn,
    token
})
export const login = () => ({
    type: types.AUTH_LOGIN
})
export const loginSuccess = (id, token) => ({
    type: types.AUTH_LOGIN_SUCCESS,
    id,
    token

})
export const loginFailure = () => ({
    type: types.AUTH_LOGIN_FAILURE
})
export const getStatus = () => ({
    type: types.AUTH_GET_STATUS
})
export const getStatusSuccess = () => ({
    type: types.AUTH_GET_STATUS_SUCCESS
})
export const getStatusFailure = () => ({
    type: types.AUTH_GET_STATUS_FAILURE
})
export const logout = () => ({
    type: types.AUTH_LOGOUT
})
export const checkPassword = ()=>({
    type: types.AUTH_CHECK_PASSWORD
})
export const checkPasswordSuccess = ()=>({
    type: types.AUTH_CHECK_PASSWORD_SUCCESS
})
export const checkPasswordFailure = ()=>({
    type: types.AUTH_CHECK_PASSWORD_FAILURE
})


export const changePassword = () => ({
    type: types.AUTH_CHANGE_PASSWORD
})
export const changePasswordSuccess = () => ({
    type: types.AUTH_CHANGE_PASSWORD_SUCCESS
})
export const changePasswordFailure = () => ({
    type: types.AUTH_CHANGE_PASSWORD_FAILURE
})

export const getInformation = () => ({
    type: types.AUTH_GET_INFORMATION
})
export const getInformationSuccess = (id, role, plantCode) => ({
    type: types.AUTH_GET_INFORMATION_SUCCESS,
    id,
    role,
    plantCode
})
export const getInformationFailure = () => ({
    type: types.AUTH_GET_INFORMATION_FAILURE
})

export const getStoreInformation = () => ({
    type: types.AUTH_GET_STORE_INFORMATION
})
export const getStoreInformationSuccess = (plantTelNo, plantName, noticeDescription) => ({
    type: types.AUTH_GET_STORE_INFORMATION_SUCCESS,
    plantTelNo,
    plantName,
    noticeDescription
})
export const getStoreInformationFailure = () => ({
    type: types.AUTH_GET_STORE_INFORMATION_FAILURE
})

export const changeInformation = () => ({
    type: types.AUTH_CHANGE_INFORMATION
})
export const changeInformationSuccess = () => ({
    type: types.AUTH_CHANGE_INFORMATION_SUCCESS
})
export const changeInformationFailure = () => ({
    type: types.AUTH_CHANGE_INFORMATION_FAILURE
})
export const getStoreSettingInform = () => ({
    type: types.AUTH_GET_STORE_SETTING_INFORMATION
})
export const getStoreSettingInformSuccess = () => ({
    type: types.AUTH_GET_STORE_SETTING_INFORMATION_SUCCESS
})
export const getStoreSettingInformFailure = () => ({
    type: types.AUTH_GET_STORE_SETTING_INFORMATION_FAILURE
})
