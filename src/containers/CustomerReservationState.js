import React, { Component } from 'react';
import { CustomerReservationStateView } from '../components';
import { connect } from 'react-redux';
import { customerReservationGetDataRequest, customerLoginRequest } from '../actions/customerReservation';
import { reservationUpdateRequest, reservationPutRequest } from '../actions/reservation';
import { getDefaultSettingValue } from '../common/common';
import axios from 'axios';

import base64 from 'base-64';


class CustomerReservationState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerData: {},
            loginId: '',
            customerCellPhone: '',
            availableCheck:true
        };
        this.handleGetCustomerReserveData = this.handleGetCustomerReserveData.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
        this.handleUpdateCustomerReserveData = this.handleUpdateCustomerReserveData.bind(this);
        this.handlePutCustomerReserveData = this.handlePutCustomerReserveData.bind(this);
        this.handleDeleteCustomerReserveData = this.handleDeleteCustomerReserveData.bind(this);
    };
    handleDeleteCustomerReserveData(customerData, newState){
        return this.handleLoginRequest().then(
            response => {
                if (response) {
                    return this.props.reservationUpdateRequest(this.state.loginId, this.state.customerCellPhone, newState).then(
                        response => {
                            if (response === true) {
                                this.handleGetCustomerReserveData(this.state.loginId, this.state.customerCellPhone);
                                return true;
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
                    this.handleGetCustomerReserveData(this.state.loginId, this.state.customerCellPhone);
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
        return this.handleLoginRequest().then(
            response => {
                if (response) {
                    return this.props.reservationUpdateRequest(this.state.loginId, this.state.customerCellPhone, newState).then(
                        response => {
                            if (response === true) {
                                this.handlePutCustomerReserveData(customerData);
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
    handleLoginRequest() {
        getDefaultSettingValue('MOBILE');

        return this.props.customerLoginRequest(this.state.loginId, this.state.customerCellPhone).then(
            response => {
                if (response===true) {
                    axios.defaults.headers.common['authorization'] = this.props.token;
                    return true;
                } else { return false; }
            }
        )
    }
    handleGetCustomerReserveData(id, cellPhone) {

        return this.props.customerReservationGetDataRequest(id, cellPhone).then(
            response => {
                if (response===true) {
                    this.setState({
                        customerData: this.props.customerData,
                        availableCheck:true
                    })
                    return true;
                } else if(response===-1){
                    this.setState({availableCheck:false})
                }
                else {
                    console.log('실패');
                    return false;
                }
            }
        )
    }
    componentWillMount() {

        getDefaultSettingValue('MOBILE');
        let tmpId = this.props.params.loginId;
        let tmpPhone = this.props.params.customerCellPhone;
        this.setState({
            loginId: tmpId,
            customerCellPhone: tmpPhone
        })
        // console.log(base64.encode('efws~*'));     

        this.handleGetCustomerReserveData(tmpId, tmpPhone);
    }
    render() {
        return (
            <div>
                <div>
                    <CustomerReservationStateView
                        loginId={this.state.loginId}
                        customerCellPhone={this.state.customerCellPhone}
                        availableCheck={this.state.availableCheck}
                        customerData={this.state.customerData}
                        onUpdateCustomerReservation={this.handleUpdateCustomerReserveData}
                        onDeleteReserveData={this.handleDeleteCustomerReserveData}
                        onGetReserveData={this.handleGetCustomerReserveData}
                    />
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        customerData: state.customerReservation.value.customerReserveData,
        token: state.customerReservation.value.token
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReservationState);