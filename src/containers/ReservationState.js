import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReservationStateView, ReservationInformView, SearchBarView, EmptyReserveData } from '../components'
import Stomp from 'stompjs';
import {
    reservationGetDataRequest, reservationUpdateRequest, reservationPutRequest
    , reservationGetTotalDataRequest, reservationGetByTableDataRequest, reservationGetHistoryDataRequest
} from '../actions/reservation';
import { plantSettingGetDataRequest } from '../actions/plantSetting'
import { getStatusRequest, loginRequest } from '../actions/authentication'
import { getCookie, Left, Right } from '../common/common';


import { setCurrentInform } from '../actions/authentication';
import '../css/common.scss'
import axios from 'axios';

import { logSaveRequest } from '../common/log'


let checkF = 1;

class ReservationState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservedData: [],
            reserveTotalData: [],
            cellPhone: '',
            reservationNo: '',
            searchType: 'reservationNo',
            reserveTotalTime: 0,
            reserveTotalTeam: 0,
            plantSettingList: [],
            beforeCallList: [],
            searchTable: '1',
            checkFlag: 1

        };

        this.handleUpdateData = this.handleUpdateData.bind(this);
        this.handlePutData = this.handlePutData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
        this.handleFilteredData = this.handleFilteredData.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.checkJWT = this.checkJWT.bind(this);

        this.handleGetPlantSettingInfo = this.handleGetPlantSettingInfo.bind(this);
        this.handleGetByTableData = this.handleGetByTableData.bind(this);
        this.handleGetBeforeCallList = this.handleGetBeforeCallList.bind(this);
        this.handleGetReserveList = this.handleGetReserveList.bind(this);
        this.handleGetTotalData = this.handleGetTotalData.bind(this);

        this.handleGetTotalDatas = this.handleGetTotalDatas.bind(this);

        // this.handleSetplantSettingList = this.handleSetplantSettingList.bind(this);
        this.handleSetBeforeCallList = this.handleSetBeforeCallList.bind(this);
        // this.handleSetReserveList = this.handleSetReserveList.bind(this);
        this.handleSetTotalData = this.handleSetTotalData.bind(this);
        // this.handleAddPlantData = this.handleAddPlantData.bind(this);
        this.handleWebSocket = this.handleWebSocket.bind(this);


        this.handleGetHistoryData = this.handleGetHistoryData.bind(this);

    }
    handleGetHistoryData(reservationNo) {
        
       return this.props.reservationGetHistoryDataRequest(this.props.authData.currentId , reservationNo).then(
            response=>{
                if(response===true){
                    
                    return true;
                }else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationGetHistoryDataRequest(this.props.authData.currentId , reservationNo).then(
                                response => {
                                    if (response === true) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            )
                        }
                    )
                }
            }
        )
    }
    handleGetTotalDatas() {

        checkF++;

        this.props.reservationGetDataRequest(this.props.authData.currentId).then(
            response => {
                if (response === true) {
                    // this.handleSetReserveList();
                    // this.handleSetBeforeCallList();
                    checkF = 1;
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationGetDataRequest(this.props.authData.currentId).then(
                                response => {
                                    if (response === true) {
                                        // this.handleSetBeforeCallList();
                                        checkF = 1;
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
        this.props.reservationGetTotalDataRequest(this.props.authData.currentId).then(
            response => {

                if (response === true) {
                    checkF = 1;
                    this.handleSetTotalData();
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationGetTotalDataRequest(this.props.authData.currentId).then(
                                response => {
                                    if (response === true) {
                                        checkF = 1;
                                        this.handleSetTotalData();
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
    handleGetReserveList() {

        this.props.reservationGetDataRequest(this.props.authData.currentId).then(
            response => {
                if (response === true) {
                    // this.handleSetReserveList();
                    // this.handleSetBeforeCallList();
                    checkF = 1;
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationGetDataRequest(this.props.authData.currentId).then(
                                response => {
                                    if (response === true) {
                                        // this.handleSetBeforeCallList();
                                        checkF = 1;
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

    handleGetTotalData() {

        this.props.reservationGetTotalDataRequest(this.props.authData.currentId).then(
            response => {
                if (response === true) {
                    checkF = 1;
                    this.handleSetTotalData();
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationGetTotalDataRequest(this.props.authData.currentId).then(
                                response => {
                                    if (response === true) {
                                        checkF = 1;
                                        this.handleSetTotalData();
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
    handleSetTotalData() {

        let getReserveTotalData = this.props.reserveTotalData;
        let tmpTotalTime = 0;
        let tmpTotalTeam = 0;

        if (getReserveTotalData === undefined) {
            getReserveTotalData = []
        } else {

            for (let i = 0; i < getReserveTotalData.length; i++) {
                tmpTotalTime = tmpTotalTime + Number(getReserveTotalData[i].remainingWaitingTime);
                tmpTotalTeam = tmpTotalTeam + Number(getReserveTotalData[i].remainingWaitingTeamCount);
            }
        }
        if (this.refs.myRef) { // setState가 render가 없으면서 시도 될때, 나오는 에러 방지를 위해 
            this.setState({
                reserveTotalData: getReserveTotalData,
                reserveTotalTime: tmpTotalTime,
                reserveTotalTeam: tmpTotalTeam,
            })
        }
    }
    handleSetBeforeCallList() {

        let tmpBeforeCallList = this.props.beforeCallList

        if (tmpBeforeCallList === undefined) tmpBeforeCallList = [];
        if (tmpBeforeCallList.length > 5) {
            tmpBeforeCallList.splice(5, tmpBeforeCallList.length - 5);
        }
        if (this.refs.myRef) {
            this.setState({
                beforeCallList: tmpBeforeCallList
            })
        }
    }
    handleGetBeforeCallList(id) {
        this.props.reservationGetByTableDataRequest(id).then(
            response => {
                if (response === true) {
                    this.handleSetBeforeCallList();
                }
            }
        )
    }
    handleGetByTableData(tableType) {
        if (this.refs.myRef) {
            this.setState({
                searchTable: tableType
            })
        }
    }

    handleGetPlantSettingInfo(id) {
        this.props.plantSettingGetDataRequest(id).then(
            response => {
                if (response === true) {
                    // this.handleSetplantSettingList();
                }
            }
        )
    }
    handleSearchTypeChange(searchType) {
        if (this.refs.myRef) {
            this.setState({
                searchType: searchType
            })
        }
    }
    handleClear() {
        if (this.refs.myRef) {
            this.setState({
                cellPhone: '',
                reservationNo: ''
            })
        }
    }
    handleChange(searchData) {
        if (this.refs.myRef) {
            if (this.state.searchType === 'cellPhone') {
                this.setState({
                    cellPhone: searchData
                })
            } else {
                this.setState({
                    reservationNo: searchData
                })
            }
        }
    }


    handleFilteredData(reserveData) {

        reserveData = reserveData.filter(
            (reserve) => {

                // if (this.state.searchType === 'cellPhone') {
                //     return reserve.customerCellphone
                //         .indexOf(this.state.cellPhone) > -1;
                // } else {
                return reserve.reservationNo.toLowerCase()
                    .indexOf(this.state.reservationNo.toLowerCase()) > -1;
                // }
            }
        );
        return reserveData;
    }
    handlePutData(reserveData) {
        checkF = 1;
        // this.setState({ checkFlag: 1 });

        return this.props.reservationPutRequest(this.props.authData.currentId, reserveData).then(
            response => {
                if (response === true) {
                    return true;
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            this.props.reservationPutRequest(this.props.authData.currentId, reserveData).then(
                                response => {
                                    if (response === true) return true;
                                }
                            )
                        }
                    )
                }
                return response;
            }
        )
    }

    handleUpdateData(reserveData, newState) {

        logSaveRequest('DEBUG', '[' + this.props.authData.currentId + '][ReservationState Button Click Event: ' + newState + ' Click');

        checkF = 1;
        // this.setState({ checkFlag: 1 });

        return this.props.reservationUpdateRequest(this.props.authData.currentId, reserveData.reservationNo, newState).then(
            response => {
                if (response === true) {
                    this.handleGetBeforeCallList(this.props.authData.currentId);
                    return true;
                }
                else if (response === -1) {

                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationUpdateRequest(this.props.authData.currentId, reserveData.reservationNo, newState).then(
                                response => {
                                    if (response === true) {
                                        this.handleGetBeforeCallList(this.props.authData.currentId);
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
    handleWebSocket() {

        let api_url = '';
        if (process.env.NODE_ENV === 'development') {
            api_url = 'ws://localhost:8080/efws-websocket/websocket';
            // api_url = 'ws://enjoeat.eland.co.kr:8080/efws-websocket/websocket';
        }
        else {
            // api_url=  'ws://localhost:8080/efws-websocket/websocket';
            api_url = 'ws://enjoeat.eland.co.kr:8080/efws-websocket/websocket';
        }
        let stomp = Stomp.client(api_url);
        stomp.connect({}, () => {
            stomp.subscribe('/from-server/' + this.props.authData.currentId + '/adminWeb', (msg) => {


                console.log(checkF)


                if (checkF === 1) {

                    console.log('websocket!!!')
                    // this.handleGetTotalData();
                    // this.handleGetReserveList();
                    this.handleGetTotalDatas();
                    this.handleGetBeforeCallList(this.props.authData.currentId);
                    // let tmp = msg.body.split(':')
                    // if (tmp[3].indexOf('waiting-information-total') > -1) {
                    //     this.handleGetTotalData();
                    //     checkF++;
                    // } else {
                    //     this.handleGetReserveList();
                    //     checkF++;
                    // }
                }
            })
        })
    }
    componentDidMount() {

        this.checkJWT().then(
            response => {
                if (response === true) {

                    this.handleGetPlantSettingInfo(this.props.authData.currentId);
                    this.handleGetTotalData();
                    this.handleGetReserveList();
                    this.handleGetBeforeCallList(this.props.authData.currentId);
                    //웹소켓 연결하는 부분
                    this.handleWebSocket();
                }
            }
        )
    }
    render() {
        const mapToReserveData = (reserveData, searchTable) => {
            let realReserveData = reserveData
            if (realReserveData === undefined || realReserveData === "") {
                return (<EmptyReserveData />)
            }
            if (searchTable !== "1") {
                realReserveData = reserveData.filter(
                    (reserve) => {
                        return reserve.tableType
                            .indexOf(searchTable) > -1;
                    })
                // realReserveData.sort((a, b) => {
                //     return a.reservationNo < b.reservationNo ? -1 : a.reservationNo > b.reservationNo ? 1 : 0;
                // });
            }
            // else {
            realReserveData.sort((a, b) => {
                return a.reservationOrderTime < b.reservationOrderTime ? -1 : a.reservationOrderTime > b.reservationOrderTime ? 1 : 0;
            });
            // }
            realReserveData = this.handleFilteredData(realReserveData);
            return realReserveData.map(
                (reserve, i) => {
                    let tmpCellPhone = '';
                    let tmpRightPhoneNumber = Right(reserve.customerCellphone, 4);
                    let tmpLeftPhoneNumber = Left(reserve.customerCellphone, 3);
                    tmpCellPhone = tmpLeftPhoneNumber + '-****-' + tmpRightPhoneNumber;
                    if (reserve.customerCellphone === '000') { tmpCellPhone = '프린터출력고객' }
                    else if (reserve.customerCellphone !== '000' && reserve.customerCellphone.length > 12) { tmpCellPhone = 'NOSHOW복구고객' }
                    return (<ReservationStateView reserveData={reserve} key={i}
                        onUpdateReserveState={this.handleUpdateData}
                        onPutReserveData={this.handlePutData}
                        CellPhone={tmpCellPhone}
                        loginId={this.props.authData.currentId}
                        plantSettingList={this.props.plantSettingData}
                        historyList = {this.props.historyList}
                        onGetHistoryList = {this.handleGetHistoryData}
                    />)
                }
            )
        }
        const mainView=(
            <div id="reserve-total">
            <div id="reserve-info-view">

                <div ref="myRef">
                    <ReservationInformView
                        reserveTotalData={this.state.reserveTotalData}
                        reserveTotalTime={this.state.reserveTotalTime}
                        reserveTotalTeam={this.state.reserveTotalTeam}
                        beforeCallList={this.state.beforeCallList}
                        plantCode={this.props.authData.currentId}
                    />
                </div>

            </div>
            <div>
                <div id="reserve-info-serch-bar" ref="myRef">
                    <SearchBarView
                        onChangeSearchData={this.handleChange}
                        onChangeSearchType={this.handleSearchTypeChange}
                        onClearData={this.handleClear}
                        searchType={this.state.searchType}
                        plantSettingList={this.props.plantSettingData}
                        onChangeRadioButton={this.handleGetByTableData}
                    />

                </div>
                <br /><br />

                <div id="reserve-info" ref="myRef">
                    <div>
                        {mapToReserveData(this.props.reserveData, this.state.searchTable)}
                    </div>
                </div>
            </div>
        </div>
        );
        return (
            <div>
            { 
                this.props.authData.currentId.indexOf("ADMIN")!==-1?'ADMIN페이지':
                mainView
            }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        reserveData: state.reservation.reserveValue,
        reserveTotalData: state.reservation.reserveTotalValue,
        beforeCallList: state.reservation.beforeCallList,
        reserveStatus: state.reservation.status,
        authData: state.authentication.value,
        loginStatus: state.authentication.login,
        plantSettingData: state.plantSetting.value.plantSettingList,
        historyList: state.reservation.historyList,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        // 여기선 dispatch 한것을 return 값으로 넣어주었기 때문에 위에서 .then을 사용할 수 있음. 
        reservationGetDataRequest: (plantCode) => {
            return dispatch(reservationGetDataRequest(plantCode))
        },
        setCurrentInform: (id, isLoggedIn, token) => {
            dispatch(setCurrentInform(id, isLoggedIn, token))
        },
        reservationUpdateRequest: (plantCode, cellPhone, state) => {
            return dispatch(reservationUpdateRequest(plantCode, cellPhone, state))
        },
        reservationPutRequest: (id, reserveData) => {
            return dispatch(reservationPutRequest(id, reserveData))
        },
        reservationGetTotalDataRequest: (id) => {
            return dispatch(reservationGetTotalDataRequest(id))
        },
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        loginRequest: (id, password) => {
            return dispatch(loginRequest(id, password))
        },
        plantSettingGetDataRequest: (id) => {
            return dispatch(plantSettingGetDataRequest(id))
        },
        reservationGetByTableDataRequest: (id) => {
            return dispatch(reservationGetByTableDataRequest(id));
        },
        reservationGetHistoryDataRequest: (plantCode, reservationNo) => {
            return dispatch(reservationGetHistoryDataRequest(plantCode, reservationNo));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReservationState);
// export default connect()(ReservationState);

