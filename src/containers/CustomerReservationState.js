import React, { Component } from 'react';
import { CustomerReservationStateView, CustomerReservationPlantInfoView } from '../components';
import { connect } from 'react-redux';
import { customerReservationGetDataRequest, customerLoginRequest } from '../actions/customerReservation';
import { reservationUpdateRequest, reservationPutRequest } from '../actions/reservation';
import { getStoreInformationRequest } from '../actions/authentication'
import { plantSettingGetDataRequest } from '../actions/plantSetting'

import { getDefaultSettingValue } from '../common/common';
import axios from 'axios';
import { browserHistory } from 'react-router';
import base64 from 'base-64';


class CustomerReservationState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerData: {},
            loginId: '',
            reservationNo: '',
            availableCheck: false,
            plantInfo: {},
            plantSettingList:[]
        };
        this.handleGetCustomerReserveData = this.handleGetCustomerReserveData.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
        this.handleUpdateCustomerReserveData = this.handleUpdateCustomerReserveData.bind(this);
        this.handlePutCustomerReserveData = this.handlePutCustomerReserveData.bind(this);
        this.handleDeleteCustomerReserveData = this.handleDeleteCustomerReserveData.bind(this);

        this.handleGetPlantSettingInfo = this.handleGetPlantSettingInfo.bind(this);
        this.handleGetPlantInfo = this.handleGetPlantInfo.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
    };
    handleDeleteCustomerReserveData(customerData, newState) {
        return this.handleLoginRequest(this.state.loginId, this.state.reservationNo).then(
            response => {

                if (response) {
                    return this.props.reservationUpdateRequest(this.state.loginId, this.state.reservationNo, newState).then(
                        response => {
                            if (response === true) {
                                this.handleGetCustomerReserveData(this.state.loginId, this.state.reservationNo);

                            } else if (response === -1) {
                                //재로그인..?
                            } else {
                                console.log('DEBUG: 예약상태 업데이트 실패')
                                return false;
                            }
                        }
                    )
                    
                } else {

                    console.log('DEBUG: 커스터머로그인실패')
                    return false;

                }

            }
        )
    }
    handlePutCustomerReserveData(reserveData) {

        return this.props.reservationPutRequest(this.state.loginId, reserveData).then(
            response => {
                if (response === true) {
                    this.handleGetCustomerReserveData(this.state.loginId, this.state.reservationNo);
                } else if (response === -1) {
                    // let loginData = getCookie('key');
                    // this.handleLogin(loginData.id, loginData.password).then(
                    //     () => {
                    //         this.props.reservationPutRequest(this.props.authData.currentId, reserveData).then(
                    //             response => {
                    //                 if (response === true) this.handleGetData();
                    //             }
                    //         )
                    //     }
                    // )
                }
                return response;
            }
        )
    }
    handleUpdateCustomerReserveData(customerData, newState) {
        return this.handleLoginRequest(this.state.loginId, this.state.reservationNo).then(
            response => {
                if (response) {
                    return this.props.reservationUpdateRequest(this.state.loginId, this.state.reservationNo, newState).then(
                        response => {
                            if (response === true) {
                                this.handlePutCustomerReserveData(customerData).then(
                                    response => {
                                        if (response === true) {
                                            browserHistory.push(`/reservationdata/${this.state.loginId}/${this.props.NewreservationNo}`)

                                        }
                                    }
                                );
                                return true;
                            } else if (response === -1) {

                            } else {
                                console.log('DEBUG: 예약상태 업데이트 실패')
                                return false;
                            }
                        }
                    )
                } else {

                    console.log('DEBUG: 커스터머로그인실패')
                    return false;

                }

            }
        )
    }
    handleLoginRequest(id, reservationNo) {
        getDefaultSettingValue('MOBILE');
        return this.props.customerLoginRequest(id, reservationNo).then(
            response => {
                if (response === true) {
                    axios.defaults.headers.common['authorization'] = this.props.token;
                    this.handleGetCustomerReserveData(id, reservationNo);
                    this.handleGetPlantInfo(id);
                    this.handleGetPlantSettingInfo(id);
                    return true;
                } else { return false; }
            }
        )
    }
    handleGetCustomerReserveData(id, reservationNo) {

        return this.props.customerReservationGetDataRequest(id, reservationNo).then(
            response => {

                if (response === true) {
                    this.setState({
                        customerData: this.props.customerData,
                        availableCheck: true
                    })
                    return true;
                } else if (response === -1) {

                    this.setState({ availableCheck: false })
                    window.location.reload();
                    return -1;
                }
                else {
                    console.log('실패');
                    return false;
                }
            }
        )
    }
    handleGetPlantInfo(id) {
        this.props.getStoreInformationRequest(id).then(
            () => {
                this.setState({
                    plantInfo: this.props.plantInfo
                })
            }
        )
    }
    handleSetData() {

        let tmpPlantSettingList = this.props.plantSettingData;
        if (tmpPlantSettingList === undefined) {
            tmpPlantSettingList = ''
        }
        this.setState({
            plantSettingList: tmpPlantSettingList
        })
        
    }

    handleGetPlantSettingInfo(id) {
        this.props.plantSettingGetDataRequest(id).then(
            response => {
                if (response === true) {
                    this.handleSetData();
                }
            }
        )
    }
    componentWillMount() {

        getDefaultSettingValue('MOBILE');
        // let tmpId = this.props.params.loginId;
        // let tmpNo = this.props.params.reservationNo;

        let tmpId = base64.decode(base64.decode(base64.decode(this.props.params.loginId)))
        let tmpNo = base64.decode(base64.decode(base64.decode(this.props.params.reservationNo)))
        this.setState({
            loginId: tmpId,
            reservationNo: tmpNo
        })
        // console.log(base64.encode('efws~*'));     
        this.handleLoginRequest(tmpId, tmpNo);

    }
    render() {
        return (
            <div>
                <div>
                    <CustomerReservationStateView
                        loginId={this.state.loginId}
                        reservationNo={this.state.reservationNo}
                        availableCheck={this.state.availableCheck}
                        customerData={this.state.customerData}
                        onUpdateCustomerReservation={this.handleUpdateCustomerReserveData}
                        onDeleteReserveData={this.handleDeleteCustomerReserveData}
                        onGetReserveData={this.handleGetCustomerReserveData}
                        plantSettingList={this.state.plantSettingList}
                    />
                </div>
                <div>
                    <CustomerReservationPlantInfoView
                        plantInfo={this.state.plantInfo}
                    />
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        customerData: state.customerReservation.value.customerReserveData,
        token: state.customerReservation.value.token,
        NewreservationNo: state.reservation.reservationNo,
        plantInfo: state.authentication.value,
        plantSettingData: state.plantSetting.value.plantSettingList,
    }

};
const mapDispatchToProps = (dispatch) => {
    return {
        customerReservationGetDataRequest: (id, cellPhone) => {
            return dispatch(customerReservationGetDataRequest(id, cellPhone))
        },
        reservationUpdateRequest: (plantCode, cellPhone, state) => {
            return dispatch(reservationUpdateRequest(plantCode, cellPhone, state))
        },
        customerLoginRequest: (id, cellPhone) => {
            return dispatch(customerLoginRequest(id, cellPhone))
        },
        reservationPutRequest: (id, reserveData) => {
            return dispatch(reservationPutRequest(id, reserveData))
        },
        getStoreInformationRequest: (id) => {
            return dispatch(getStoreInformationRequest(id))
        },
        plantSettingGetDataRequest: (id) => {
            return dispatch(plantSettingGetDataRequest(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReservationState);