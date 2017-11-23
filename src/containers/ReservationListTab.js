import React, { Component } from 'react';
import { NoShowListView, CancelListView } from '../components'
import { connect } from 'react-redux';
import {
    reservationGetStateDataRequest
    , reservationUpdateRequest
} from '../actions/reservation';
import { setCurrentInform } from '../actions/authentication';
import { getStatusRequest, loginRequest } from '../actions/authentication'
import axios from 'axios';
import { getCookie } from '../common/common';
import { logSaveRequest } from '../common/log'
import { Tabs, Tab } from 'material-ui/Tabs';

import { reservationstatelistStyle } from '../common/styles';


class PlantSettingTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noshowList: [],
            cancelList: [],

        };

        this.checkJWT = this.checkJWT.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.handleGetNoshowData = this.handleGetNoshowData.bind(this);
        this.handleSetNoShowData = this.handleSetNoShowData.bind(this);
        this.handleUpdateData = this.handleUpdateData.bind(this);

        this.handleGetCancelData = this.handleGetCancelData.bind(this);
        this.handleSetCancelData = this.handleSetCancelData.bind(this);
    }
    checkJWT() {

        let loginData = getCookie('key');
        if (typeof loginData === "undefined" || !loginData.isLoggedIn) return;
        axios.defaults.headers.common['authorization'] = loginData.token;
        this.props.setCurrentInform(loginData.id, loginData.isLoggedIn, loginData.token);
        return this.props.getStatusRequest().then(
            response => {
                if (response === true) return true;
                if (!response) {
                    return this.handleLogin(loginData.id, loginData.password)
                }
            }
        )
    }
    handleLogin(id, password) {

        return this.props.loginRequest(id, password).then(
            () => {
                if (this.props.loginStatus.status === "SUCCESS") {
                    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                    let loginData = {
                        isLoggedIn: true,
                        id: id,
                        password: password,//비번도 암호화 해서 쿠키에 저장하도록 수정
                        token: this.props.authData.token
                    };
                    axios.defaults.headers.common['authorization'] = loginData.token;
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    return true;
                }
                else {
                    return false;
                }
            }
        )
    }
    handleGetNoshowData() {
        this.props.reservationGetStateDataRequest(this.props.authData.currentId, 'NOSHOW').then(
            response => {
                if (response === true) {
                    this.handleSetNoShowData();
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationGetStateDataRequest(this.props.authData.currentId, 'NOSHOW').then(
                                response => {
                                    if (response === true) {
                                        this.handleSetNoShowData();
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            )
                        }
                    )
                }
                else {
                    console.log('데이터불러오기 실패')
                }
            }
        )
    }
    handleSetNoShowData() {
        let tmpnoshowList = this.props.noshowList;

        if (tmpnoshowList === undefined) {
            tmpnoshowList = []
        }
        if (this.refs.myRef) { // setState가 render가 없으면서 시도 될때, 나오는 에러 방지를 위해 
            this.setState({
                noshowList: tmpnoshowList,
            })
        }


    }

    handleUpdateData(reserveData, newState) {

        logSaveRequest('DEBUG', '[' + this.props.authData.currentId + '][NoShowlist Button Click Event: ' + newState + ' Click');

        return this.props.reservationUpdateRequest(this.props.authData.currentId, reserveData.reservationNo, newState).then(
            response => {
                if (response === true) {
                    this.handleGetNoshowData();
                    return true;
                }
                else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationUpdateRequest(this.props.authData.currentId, reserveData.reservationNo, newState).then(
                                response => {
                                    if (response === true) {
                                        this.handleGetNoshowData();
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            )
                        }
                    )
                } else {
                    console.log('DEBUG: 예약상태 업데이트 실패');
                    return false;
                }
            })
    }
    handleGetCancelData() {
        
        this.props.reservationGetStateDataRequest(this.props.authData.currentId, 'CANCEL').then(
            response => {
                
                if (response === true) {
                    this.handleSetCancelData();
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationGetStateDataRequest(this.props.authData.currentId, 'CANCEL').then(
                                response => {
                                    if (response === true) {
                                        this.handleSetCancelData();
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            )
                        }
                    )
                }
                else {
                    console.log('데이터불러오기 실패')
                }
            }
        )
    }
    handleSetCancelData() {
        let tmpcancelList = this.props.cancelList;

        if (tmpcancelList === undefined) {
            tmpcancelList = []
        }
        if (this.refs.myRef) { // setState가 render가 없으면서 시도 될때, 나오는 에러 방지를 위해 
            this.setState({
                cancelList: tmpcancelList,
            })
        }
        
    }
    componentDidMount() {
        this.checkJWT().then(
            response => {
                if (response === true) {
                    this.handleGetNoshowData(this.props.authData.currentId);
                    this.handleGetCancelData(this.props.authData.currentId);
                }
            }
        )
    }
    render() {

        return (
            <div ref="myRef">
                <br />
                <Tabs style={reservationstatelistStyle.Tabs}>
                    <Tab label="NOSHOW리스트" >
                        <div >
                            <NoShowListView
                                noshowList={this.state.noshowList}
                                onUpdateReserveState={this.handleUpdateData}
                            />
                        </div>
                    </Tab>
                    <Tab label="CANCEL리스트" >
                        <CancelListView
                            cancelList={this.state.cancelList}
                        />
                    </Tab>
                </Tabs>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        noshowList: state.reservation.noshowList,
        loginStatus: state.authentication.login,
        authData: state.authentication.value,
        cancelList:state.reservation.cancelList,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentInform: (id, isLoggedIn, token) => {
            dispatch(setCurrentInform(id, isLoggedIn, token))
        },
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        loginRequest: (id, password) => {
            return dispatch(loginRequest(id, password))
        },
        reservationGetStateDataRequest: (id, state) => {
            return dispatch(reservationGetStateDataRequest(id, state))
        },
        reservationUpdateRequest: (plantCode, cellPhone, state) => {
            return dispatch(reservationUpdateRequest(plantCode, cellPhone, state))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlantSettingTab);


