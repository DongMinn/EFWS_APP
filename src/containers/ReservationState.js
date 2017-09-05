import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReservationStateView, ReservationInformView, SearchBarView } from '../components'
import Stomp from 'stompjs';
import { reservationGetDataRequest, reservationUpdateRequest, reservationPutRequest, reservationGetTotalDataRequest } from '../actions/reservation';
import { getStatusRequest, loginRequest } from '../actions/authentication'
import { getCookie , Left , Right } from '../common/common';
import { setCurrentInform } from '../actions/authentication';
import '../css/common.scss'
import axios from 'axios';


class ReservationState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservedData: [],
            reserveTotalData: [],
            cellPhone: '',
            reservationNo: '',
            searchType: 'cellPhone',
            reserveTotalTime: 0,
            reserveTotalTeam: 0
        };
        this.handleSetData = this.handleSetData.bind(this);
        this.handleUpdateData = this.handleUpdateData.bind(this);
        this.handlePutData = this.handlePutData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
        this.handleFilteredData = this.handleFilteredData.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleGetData = this.handleGetData.bind(this);
        this.checkJWT = this.checkJWT.bind(this);
    }
    
    handleSearchTypeChange(searchType) {
        this.setState({
            searchType: searchType
        })
    }
    handleClear() {
        this.setState({
            cellPhone: '',
            reservationNo: ''
        })
    }
    handleChange(searchData) {
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
    checkJWT() {
        let loginData = getCookie('key');
      
        if (typeof loginData === "undefined" || !loginData.isLoggedIn) return;
        axios.defaults.headers.common['authorization'] = loginData.token;
        this.props.setCurrentInform(loginData.id, loginData.isLoggedIn, loginData.token);
        this.props.getStatusRequest().then(
            response => {
                if (!response) {

                    this.handleLogin(loginData.id, loginData.password)
                } else {
                    this.handleGetData();
                }
            }
        )
    }
    handleLogin(id, password) {
        return this.props.loginRequest(id, password).then(
            () => {
                if (this.props.loginStatus.status === "SUCCESS") {
                    //document.cookie = '';
                    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });      
                    let loginData = {
                        isLoggedIn: true,
                        id: id,
                        password: password,//비번도 암호화 해서 쿠키에 저장하도록 수정
                        token: this.props.authData.token
                    };
                    axios.defaults.headers.common['authorization'] = loginData.token;
                    //쿠키저장
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    this.handleGetData();
                    return true;
                }
                else {
                    return false;
                }
            }
        )
    }
    handleGetData() {
        this.props.reservationGetTotalDataRequest(this.props.authData.currentId).then(
            response => {
                
                if (response===true) {
                    this.handleSetData();
                }else if(response===-1) this.checkJWT();
                else{
                    console.log('데이터불러오기 실패')
                }
            }
        )
        this.props.reservationGetDataRequest(this.props.authData.currentId).then(
            response => {
                if (response===true) {
                    this.handleSetData();
                }else if(response===-1) this.checkJWT();
                else{
                    console.log('데이터불러오기 실패')
                }
            }
        )
    }
    handleFilteredData(reserveData) {
        reserveData.sort((a, b) => {
            return a.tableType < b.tableType ? -1 : a.tableType > b.tableType ? 1 : 0;
        });

        reserveData = reserveData.filter(
            (reserve) => {
                if (this.state.searchType === 'cellPhone') {
                    return reserve.customerCellphone.toLowerCase()
                        .indexOf(this.state.cellPhone.toLowerCase()) > -1;
                } else {
                    return reserve.reservationNo.toLowerCase()
                        .indexOf(this.state.reservationNo.toLowerCase()) > -1;
                }
            }
        );
        return reserveData;
    }
    handlePutData(reserveData) {
        return this.props.reservationPutRequest(this.props.authData.currentId, reserveData).then(
            response => {
                if (response === true) {
                    this.handleGetData();
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            this.props.reservationPutRequest(this.props.authData.currentId, reserveData).then(
                                response => {
                                    if (response === true) this.handleGetData();
                                }
                            )
                        }
                    )
                }
                return response;
            }
        )
    }
    handleSetData() {
        let getReserveData = this.props.reserveData;
        let getReserveTotalData = this.props.reserveTotalData;
        let tmpTotalTime = 0;
        let tmpTotalTeam = 0;
        if (getReserveData === undefined) {
            getReserveData = ''
        }
        if (getReserveTotalData === undefined) {
            getReserveTotalData = ''
        } else {

            for (let i = 0; i < getReserveTotalData.length; i++) {
                tmpTotalTime = tmpTotalTime + Number(getReserveTotalData[i].remainingWaitingTime);
                tmpTotalTeam = tmpTotalTeam + Number(getReserveTotalData[i].remainingWaitingTeamCount);
            }
        }  
        this.setState({
            reservedData: getReserveData,
            reserveTotalData: getReserveTotalData,
            reserveTotalTime: tmpTotalTime,
            reserveTotalTeam: tmpTotalTeam
        })    
    }
    handleUpdateData(reserveData, newState) {
        //if -1 ? 토큰먼저확인 
        //reservationUpdateReques
        return this.props.reservationUpdateRequest(this.props.authData.currentId, reserveData.customerCellphone, newState).then(
            response => {
                //성공
                if (response === true) {
                    this.handleGetData();
                    return true;
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            return this.props.reservationUpdateRequest(this.props.authData.currentId, reserveData.customerCellphone, newState).then(
                                response => {
                                    if (response === true) {
                                        this.handleGetData();
                                        return true;
                                    }else{
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
    //컴포터는 최초 로딩시 데이터 호출
    componentWillMount() {
        this.checkJWT();

    }
    componentDidMount() {
        //웹소켓 연결하는 부분

        let api_url='';
        if(process.env.NODE_ENV === 'development'){
          api_url=  'ws://localhost:8080/efws-websocket/websocket';
        // api_url = 'ws://enjoeat.eland.co.kr:8080/efws-websocket/websocket';
        }
        else {
            // api_url=  'ws://localhost:8080/efws-websocket/websocket';
          api_url = 'ws://enjoeat.eland.co.kr:8080/efws-websocket/websocket';
        }
        let stomp = Stomp.client(api_url);
        stomp.connect({}, () => {
            stomp.subscribe('/from-server/' + this.props.authData.currentId + '/adminWeb', (msg) => {
                //예약 데이터 불러오는 요청
                this.checkJWT();
            })
        })
    }
    componentWillUnmount() {
    }

    render() {
        const mapToReserveData = (reserveData) => {

            reserveData.sort((a, b) => {
                return a.tableType < b.tableType ? -1 : a.tableType > b.tableType ? 1 : 0;
            });
            reserveData = this.handleFilteredData(reserveData);
            return reserveData.map(
                (reserve, i) => {
                    let tmpCellPhone= '';
                    let tmpRightPhoneNumber = Right(reserve.customerCellphone , 4);
                    let tmpLeftPhoneNumber = Left(reserve.customerCellphone , 3);
                    tmpCellPhone = tmpLeftPhoneNumber + '-****-'+ tmpRightPhoneNumber;
                    return (<ReservationStateView reserveData={reserve} key={i}
                        onUpdateReserveState={this.handleUpdateData}
                        onPutReserveData={this.handlePutData}
                        CellPhone = {tmpCellPhone}
                    />)
                }
            )
        }
        return (
            <div>
                <div>

                    <ReservationInformView
                        reserveTotalData={this.state.reserveTotalData}
                        reserveTotalTime={this.state.reserveTotalTime}
                        reserveTotalTeam={this.state.reserveTotalTeam}
                    />
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br/> <br/><br/> <br/>
                <br />
                <div>
                    <div id="reserveInfo">
                        <SearchBarView 
                            onChangeSearchData={this.handleChange}
                            onChangeSearchType={this.handleSearchTypeChange}
                            onClearData={this.handleClear}
                            searchType={this.state.searchType}
                        />

                    </div>
                    <br /><br />
                    <div id="reserveInfo">
                        {mapToReserveData(this.state.reservedData)}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        reserveData: state.reservation.reserveValue,
        reserveTotalData: state.reservation.reserveTotalValue,
        reserveStatus: state.reservation.status,
        authData: state.authentication.value,
        loginStatus: state.authentication.login
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
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReservationState);
// export default connect()(ReservationState);

