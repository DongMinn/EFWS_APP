import * as types from '../actions/ActionTypes';
// import update from 'react-addons-update';
const initialState={
    login:{
        status:'INIT'
    },
    status:{
        valid : false , 
        isLoggedIn:false,
        changePwd:'',
        changeInform:'',
        getInform:'',
        getStoreInform:'',
        checkPwd:''
    },
    value:{
        valid:false,
        currentId:'',
        currentPwd:'',
        token:'',
        plantCode:'',
        role:'',
        plantName:'',
        plantTelNo:'',
        noticeDescription:''
    }
};

export default function authentication(state=initialState , action){
    switch(action.type){
        case types.AUTH_SET_CURRENTINFORM:
            return{
                ...state,
                status:{
                    ...state.status,
                    isLoggedIn:action.isLoggedIn
                },
                value:{
                    ...state.value,
                    currentId:action.id,
                    token:action.token
                }
            };
        case types.AUTH_LOGIN:
            return {
                ...state,
                login:{
                    ...state.login,
                    status:'WAITING'
                }
            };
        case types.AUTH_LOGIN_SUCCESS:
            return{
                ...state,
                login:{
                    ...state.login,
                    status:'SUCCESS'
                },
                status:{
                    ...state.status,
                    isLoggedIn:true
                },
                value:{
                    ...state.value,
                    currentId:action.id,
                    token:action.token
                }
            };
        case types.AUTH_LOGIN_FAILURE:
            return{
                ...state,
                login:{
                    ...state.login,
                    status:'FAILURE'
                }
            };
            /*
            AUTH_GET_STATUS 는 쿠키에 세션이 저장 된 상태에서, 새로고침을 했을 때 만 실행이 됩니다.
액션이 처음 실행 될 때, isLoggedIn 을 true 로 하는데요, 이 이유는, 이렇게 하지 않으면 로그인 된 상태에서 새로고침 했을 때,
세션 확인 AJAX 요청이 끝날떄까지 (아주 짧은시간이지만) 컴포넌트가 현재 로그인상태가 아닌것으로 인식하기 때문에
미세한 시간이지만 살짝, 깜빡임이 있겠죠? (로그인 버튼에서 로그아웃 버튼으로 변하면서)

이를 방지하기위하여 요청을 시작 할때는 컴포넌트에서 로그인상태인것으로 인식하게 하고
세션이 유효하다면 그대로 두고, 그렇지 않다면 로그아웃상태로 만듭니다.
            */
        case types.AUTH_GET_STATUS:
            return{
                ...state,
                status:{
                    ...state.status,
                    isLoggedIn:true
                }
            };
        case types.AUTH_GET_STATUS_SUCCESS:
            return{
                ...state,
                value:{
                    ...state.value,
                    valid:true,
                }
            };
        case types.AUTH_GET_STATUS_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    isLoggedIn:false
                },
                value:{
                    ...state.value,
                    valid:false
                }
            };
        case types.AUTH_LOGOUT:
            return{
                ...state,
                login:{
                    ...state.login,
                    status:'INIT'

                },
                status:{
                    ...state.status,
                    isLoggedIn:false
                },
                value:{
                    ...state.value,
                    valid:false,
                    token:'',
                    currentId:'',
                    currentPwd:'',
                    plantCode:'',
                    role:'',
                    plantName:'',
                    plantTelNo:'',
                    noticeDescription:''
                }
            };
        case types.AUTH_CHECK_PASSWORD:
            return{
                ...state,
                status:{
                    ...state.status,
                    checkPwd:'INIT'
                }
            };
        case types.AUTH_CHECK_PASSWORD_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    checkPwd:'SUCCESS'
                }
            };
        case types.AUTH_CHECK_PASSWORD_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    checkPwd:'FAILURE'
                }
            };
        case types.AUTH_CHANGE_PASSWORD:
            return{
                ...state,
                status:{
                    ...state.status,
                    changePwd:'INIT'
                }
            };
        case types.AUTH_CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    changePwd:'SUCCESS'
                }
            };
        case types.AUTH_CHANGE_PASSWORD_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    changePwd:'FAILURE'
                }
            };
        case types.AUTH_CHANGE_INFORMATION:
            return{
                ...state,
                status:{
                    ...state.status,
                    changeInform:'INIT'
                }
            };
        case types.AUTH_CHANGE_INFORMATION_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    changeInform:'SUCCESS'
                }
            };
        case types.AUTH_CHANGE_INFORMATION_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    changeInform:'FAILURE'
                }
            };
        case types.AUTH_GET_INFORMATION:
            return{
                ...state,
                status:{
                    ...state.status,
                    getInform:'INIT'
                }
            };
        case types.AUTH_GET_INFORMATION_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    getInform:'SUCCESS',
                },
                value:{
                    ...state.value,
                    currentId:action.id,
                    plantCode:action.plantCode,
                    role:action.role
                }
            };
        case types.AUTH_GET_INFORMATION_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    getInform:'FAILURE'
                }
            };
        case types.AUTH_GET_STORE_INFORMATION:
            return{
                ...state,
                status:{
                    ...state.status,
                    getStoreInform:'INIT'
                }
            };
        case types.AUTH_GET_STORE_INFORMATION_SUCCESS:
            return{
                ...state,
                status:{
                    ...state.status,
                    getStoreInform:'SUCCESS'
                },
                value:{
                    ...state.value,
                    plantTelNo:action.plantTelNo,
                    plantName:action.plantName,
                    noticeDescription:action.noticeDescription
                }
            };
        case types.AUTH_GET_STORE_INFORMATION_FAILURE:
            return{
                ...state,
                status:{
                    ...state.status,
                    getStoreInform:'FAILURE'
                }
            }
        default:
            return state;
    }
}