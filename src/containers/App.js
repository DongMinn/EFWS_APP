import React, { Component } from 'react';
import { Header } from '../components'
import { connect } from 'react-redux';
import { getStatusRequest, setCurrentInform, logout, getInformationRequest} from '../actions/authentication';
import { browserHistory } from 'react-router';
import { getCookie, getDefaultSettingValue } from '../common/common';
import axios from 'axios';

import '../css/common.scss';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            plantCode: '',
            role: ''
        }
        this.requestLogout = this.requestLogout.bind(this);
        this.handleGetInform = this.handleGetInform.bind(this);
        this.handleSetInform = this.handleSetInform.bind(this);
    }
   
    handleSetInform() {
        this.setState({
            id: this.props.value.currentId,
            plantCode: this.props.value.plantCode,
            role: this.props.value.role
        })
    }
    handleGetInform(id) {
        return this.props.getInformRequest(id).then(
            () => {
                this.handleSetInform();
                // console.log('DEBUG:settingInformation--- handleGetInform ')
                // console.log(this.props.value)
            }
        )

    };
    requestLogout() {
        // console.log('DEBUG:logout=================request');
        // console.log(loginData);
        // document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        // console.log('DEBUG:로그아웃 쿠키=================request');
        // console.log(document.cookie)

        this.props.logoutRequest();
        browserHistory.push('/');
    }

    componentWillMount() {

        let tmpId = this.props.params.loginId;
        // console.log('DEBUG: 무조건 APP이 실행됨!!!')
        getDefaultSettingValue('WEB');
        // get cookie by name 
        let loginData = getCookie('key');
        // console.log('DEBUG: App 컨테이너 쿠키데이터')
        // console.log(loginData);
        if (typeof loginData === "undefined" || !loginData.isLoggedIn) return;
        // //로그인데이터 쿠키가 존재하면 그 안에 토큰 값을 글로벌 토큰값으로 .3
        // // 쿠키에 있는 현재 아이디 값을 스토어에 저장해 두기 
        // //새로 고침을 했을때 제일먼저, jwt토큰 값을 확인하고 나서 진행하면 될듯.
        // //여기서 토큰값이 만료되었다면, 새롭게 로그인 시키면 됨,
        
        //새로고침되었을때 실행되는 부분
        this.props.setCurrentInform(loginData.id, loginData.isLoggedIn, loginData.token);
        axios.defaults.headers.common['authorization'] = loginData.token;
        // console.log('DEBUG: 기존 토큰값으로 세팅!!!')
        // this.handleGetInform(loginData.id);
        // if (!loginData.isLoggedIn) return;
        // browserHistory.push('/wh');
    }

    componentDidMount() {
        //기본값 세팅하기
        //not logged in , do nothing 근데 이 경우는 없을듯? 코드가 없는데..?
        //기본 정보 스토어에 저장
        // console.log('currentid:' + this.props.value.currentId);
        //매장정보 가져오기
    }

    render() {
        // let re = /(login|change)/;
        // let isAuth = re.test(this.props.location.pathname);

        return (
            <div id="common">
                <Header
                    isLoggedIn={this.props.status.isLoggedIn}
                    onLogout={this.requestLogout}
                />
                {this.props.children}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        value: state.authentication.value,
        status: state.authentication.status,
        reserveData: state.reservation.value,
        loginStatus: state.authentication.login,

    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        //미들웨어 리덕스 텅크스? 디스패치 사용법 
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        //일반 리덕스 디스패치 사용법
        logoutRequest: () => {
            dispatch(logout())
        },
        setCurrentInform: (id, isLoggedIn, token) => {
            dispatch(setCurrentInform(id, isLoggedIn, token))
        },
        getInformRequest: (id) => {
            return dispatch(getInformationRequest(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);