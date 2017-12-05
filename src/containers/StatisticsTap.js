import React, { Component } from 'react';
import {  DailyReportView  , DailyReportSearchView} from '../components'
import { connect } from 'react-redux';
import {
    dailyPlantstatisticGetDataRequest
} from '../actions/statistic';
import { setCurrentInform } from '../actions/authentication';
import { getStatusRequest, loginRequest } from '../actions/authentication'
import axios from 'axios';
import { getCookie } from '../common/common';
import { logSaveRequest } from '../common/log'
import { Tabs, Tab } from 'material-ui/Tabs';

import { reservationstatelistStyle } from '../common/styles';


class StatisticsTap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statisticList: [],
            dailyStartDate:null,
            dailyEndDate:null,
            failStatus:false

        };

        this.checkJWT = this.checkJWT.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        
        this.handleFailStatus = this.handleFailStatus.bind(this);

        this.handleGetDailyStatistics = this.handleGetDailyStatistics.bind(this);
        this.handleUpdateDailyDate = this.handleUpdateDailyDate.bind(this);
        this.handleSetDailyStatisticList = this.handleSetDailyStatisticList.bind(this);
 
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
    handleUpdateDailyDate(type , dates){

      
        
        if(type==="start"){
            this.setState({
                dailyStartDate:dates.replace("-","").replace("-","")
            })
        }else{
            this.setState({
                dailyEndDate:dates.replace("-","").replace("-","")
            })
        }
        

        
    }
    handleGetDailyStatistics(){
        logSaveRequest('DEBUG', '[' + this.props.authData.currentId + '][Statistic Button Click Event: Daily Click');

        return this.props.dailyPlantstatisticGetDataRequest(this.props.authData.currentId , this.state.dailyStartDate , this.state.dailyEndDate).then(
            response => {
                if (response === true) {
                    this.handleSetDailyStatisticList();
                    return true;
                }else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        () => {
                            this.props.dailyPlantstatisticGetDataRequest(this.props.authData.currentId , this.state.dailyStartDate , this.state.dailyEndDate).then(
                                response => {
                                    if (response === true) {
                                        
                                        this.handleSetDailyStatisticList();
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
                    console.log('통계데이터불러오기 실패')
                    this.setState({failStatus:true})
                    return false;
                }
            }
        )
    }
    handleSetDailyStatisticList(){

        
        let getDailyStatisticData = this.props.dailyStatisticList;
        

        if (getDailyStatisticData === undefined) {
            getDailyStatisticData = []
        }
        if (this.refs.myRef) { // setState가 render가 없으면서 시도 될때, 나오는 에러 방지를 위해 
            this.setState({
                statisticList: getDailyStatisticData,
            })
        }
        
    }
    handleFailStatus(){
        this.setState({failStatus:false})
    }
    componentDidMount() {
        this.checkJWT().then(
            response => {
                if (response === true) {
                    
                }
            }
        )
    }
    render() {

        return (
            <div ref="myRef">
                <br />
                <Tabs >
                    <Tab label="일별 통계" >
                        <div>
                            <DailyReportSearchView        
                                onGetStatisticList = {this.handleGetDailyStatistics}
                                onSetDailyDate = {this.handleUpdateDailyDate}
                                failStatus={this.state.failStatus}
                                onFailStatus = {this.handleFailStatus}
                            />
                        </div>
                        <div >
                            <DailyReportView
                                statisticList={this.state.statisticList}

                            />
                        </div>
                    </Tab>
                  
                </Tabs>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        dailyStatisticList: state.statistic.dailyStatisticList,
        authData: state.authentication.value,
        loginStatus: state.authentication.login,
        
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
        dailyPlantstatisticGetDataRequest: (id, startDate , endDate) => {
            return dispatch(dailyPlantstatisticGetDataRequest(id, startDate , endDate))
        },
      
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(StatisticsTap);


