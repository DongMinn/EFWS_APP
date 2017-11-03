import React, { Component } from 'react';

import {
    PlantInformSettingView, PlantSettingSaveButtonView, PlantInformSettingTimeView, PlantInformSettingAlarmView
    , PlantInformAlarmSaveButtonView, PlantInformAlarmAddButtonView
} from '../components';

import { connect } from 'react-redux';
import {
    plantSettingGetDataRequest, plantSettingUpdateDataRequest, plantSettingGetTimeDataRequest
    , plantSettingUpdateTimeDataRequest, plantSettingGetAlarmDataRequest, plantSettingUpdateAlarmDataRequest
} from '../actions/plantSetting';
import { getStatusRequest, setCurrentInform, loginRequest } from '../actions/authentication'
import { plantSettingStyles } from '../common/styles';
import { getCookie } from '../common/common';
import axios from 'axios';

import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import { logSaveRequest } from '../common/log'

class PlantSettingTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plantSettingList: [],
            noshowTime: '',
            maxTime:'',
            alarmTalkList: [],
            alarmCheckSuccessStatus: false

        };

        this.handleGetPlantSetting = this.handleGetPlantSetting.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
        this.handleUpdatePlantSetting = this.handleUpdatePlantSetting.bind(this);
        this.handleChangeCheckFlag = this.handleChangeCheckFlag.bind(this);
        this.handleChangeTableTime = this.handleChangeTableTime.bind(this);

        this.handleGetPlantSettingAlarm = this.handleGetPlantSettingAlarm.bind(this);
        this.handleSetAlarm = this.handleSetAlarm.bind(this);
        this.handleAddAlarm = this.handleAddAlarm.bind(this);
        this.handleRemoveAlarm = this.handleRemoveAlarm.bind(this);
        this.handleChangeAlarm = this.handleChangeAlarm.bind(this);
        this.handleUpdateAlarm = this.handleUpdateAlarm.bind(this);

        this.handleGetPlantSettingTime = this.handleGetPlantSettingTime.bind(this);
        this.handleUpdateTime = this.handleUpdateTime.bind(this);
        this.handleChangeNoshowTime = this.handleChangeNoshowTime.bind(this);
        this.handleSetTime = this.handleSetTime.bind(this);
        this.handleChangeMaxTime = this.handleChangeMaxTime.bind(this);

        this.handleLogin = this.handleLogin.bind(this);
        this.checkJWT = this.checkJWT.bind(this);
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
                    this.handleGetPlantSetting();
                    this.handleGetPlantSettingTime();
                    this.handleGetPlantSettingAlarm();
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
                    //쿠키저장
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    this.handleGetPlantSetting();
                    this.handleGetPlantSettingTime();
                    this.handleGetPlantSettingAlarm();
                    return true;
                }
                else {
                    return false;
                }
            }
        )
    }
    handleGetPlantSettingAlarm() {
        this.props.plantSettingGetAlarmDataRequest(this.props.authData.currentId).then(
            response => {
                if (response === true) {
                    this.handleSetAlarm();
                }
            }
        )
    }
    handleSetAlarm() {
        let tmpalarmTalkList = this.props.alarmTalkList;
        if (tmpalarmTalkList === undefined) {
            tmpalarmTalkList = ''
        }

        this.setState({
            alarmTalkList: tmpalarmTalkList
        })
    }
    handleAddAlarm() {
        let tmpList = this.state.alarmTalkList;
        let lastPoint = 0;
        let lastNo = (parseInt(tmpList[tmpList.length - 1].sequence, 10) + 1).toString();
        if (parseInt(tmpList[tmpList.length - 1].sendPoint, 10) - 1 < 0) lastPoint = "0"
        else {
            lastPoint = (parseInt(tmpList[tmpList.length - 1].sendPoint, 10) - 1).toString();
        }

        tmpList.push({ sequence: lastNo, sendPoint: lastPoint });

        this.setState({
            alarmTalkList: tmpList
        })
    }
    handleRemoveAlarm(index) {

        let tmpList = this.state.alarmTalkList;
        tmpList.splice(index, 1);

        for (let i = 1; i < tmpList.length; i++) {
            tmpList[i].sequence = (i + 1).toString();
        }
        this.setState({
            alarmTalkList: tmpList
        })
        return true;

    }
    handleChangeAlarm(alarmTalkData, value) {


        let tmpAlarmTalkList = this.state.alarmTalkList;
        let newValue = value.toString();
        let tmpAlarmTalkData = alarmTalkData;

        tmpAlarmTalkData = {
            ...tmpAlarmTalkData,
            sendPoint: newValue
        }
        let tmpSequence = tmpAlarmTalkData.sequence;
        for (let i = 1; i < tmpAlarmTalkList.length; i++) {
            if (tmpSequence === tmpAlarmTalkList[i].sequence) {
                tmpAlarmTalkList[i] = tmpAlarmTalkData;
            }
        }
        /*중복확인*/


        for (let i = 1; i < tmpAlarmTalkList.length - 1; i++) {
            for (let y = i + 1; y < tmpAlarmTalkList.length; y++) {
                if (tmpAlarmTalkList[i].sendPoint === tmpAlarmTalkList[y].sendPoint) {
                    return false;
                }
            }
        }

        /*자동정렬하기*/
        for (let i = 1; i < tmpAlarmTalkList.length - 1; i++) {
            for (let y = i + 1; y < tmpAlarmTalkList.length; y++) {
                if (tmpAlarmTalkList[i].sendPoint < tmpAlarmTalkList[y].sendPoint) {
                    let tmpPoint = tmpAlarmTalkList[i].sendPoint
                    tmpAlarmTalkList[i].sendPoint = tmpAlarmTalkList[y].sendPoint
                    tmpAlarmTalkList[y].sendPoint = tmpPoint
                }
            }
        }
        this.setState({
            alarmTalkList: tmpAlarmTalkList
        })
        return true;

        // let tmpSequence = tmpAlarmTalkData.sequence;

        // for (let i = 1; i < tmpAlarmTalkList.length; i++) {
        //     if (tmpSequence === tmpAlarmTalkList[i].sequence) {
        //         tmpAlarmTalkList[i] = tmpAlarmTalkData;
        //         this.setState({
        //             alarmTalkList: tmpAlarmTalkList
        //         })
        //         return true;
        //     }
        // }
        // return false;
    }

    handleUpdateAlarm() {

        logSaveRequest('DEBUG', '[' + this.props.authData.currentId + '][PlantSettingTab AlarmSetting Button Click Event: Save Click');

        let delData = []
        let tmpAlarmTalkList = this.state.alarmTalkList;
        for (let i = 1; i < tmpAlarmTalkList.length - 1; i++) {
            for (let y = i + 1; y < tmpAlarmTalkList.length; y++) {
                if (tmpAlarmTalkList[i].sendPoint === tmpAlarmTalkList[y].sendPoint) {
                    delData.push(y);
                }
            }
        }

        for (let i = delData.length - 1; i >= 0; i--) {
            tmpAlarmTalkList.splice(delData[i], 1)
        }

        return this.props.plantSettingUpdateAlarmDataRequest(this.props.authData.currentId, tmpAlarmTalkList).then(
            response => {
                if (response === true) {
                    this.handleGetPlantSettingAlarm();
                    return true;
                } else if (response === -1) {

                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        (reseponse) => {
                            if (reseponse) {
                                return this.props.plantSettingUpdateAlarmDataRequest(this.props.authData.currentId, tmpAlarmTalkList).then(
                                    response => {
                                        if (response === true) { this.handleGetPlantSettingAlarm(); return true; }
                                    }
                                )
                            }
                        }
                    )
                } else {
                    console.log('DEBUG: 알림톡 업데이트 실패');
                    return false;
                }
            }
        )
    }

    handleGetPlantSettingTime() {
        return this.props.plantSettingGetTimeRequest(this.props.authData.currentId).then(
            response => {
                if (response === true) {
                    this.handleSetTime();
                }
            }
        )
        // this.props.authData.currentId
    }
    handleSetTime() {

        let tmpNoshowTime = this.props.noShowTime;
        if (tmpNoshowTime === undefined) {
            tmpNoshowTime = ''
        }
        let tmpMaxTime = this.props.maxTime;
        if(tmpMaxTime ===undefined){
            tmpMaxTime = ''
        }
        this.setState({
            noshowTime: tmpNoshowTime,
            maxtime:tmpMaxTime
        })
    }
    
    handleUpdateTime() {

        logSaveRequest('DEBUG', '[' + this.props.authData.currentId + '][PlantSettingTab NOSHOWSetting Button Click Event: Save Click');

        return this.props.plantSettingUpdateTimeRequest(this.props.authData.currentId, this.state.noshowTime).then(
            response => {
                if (response === true) {
                    this.handleGetPlantSettingTime();
                    return true;
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        (reseponse) => {
                            if (reseponse) {
                                return this.props.plantSettingUpdateTimeRequest(this.props.authData.currentId, this.state.noshowTime).then(
                                    response => {
                                        if (response === true) { this.handleGetPlantSettingTime(); return true; }
                                    }
                                )
                            }
                        }
                    )
                } else {
                    console.log('DEBUG:nosh 업데이트 실패');
                    return false;
                }
            }
        )
    }
    handleChangeNoshowTime(value) {

        this.setState({ noshowTime: value })
        return true;
    }
    handleChangeMaxTime(value) {

        this.setState({ maxTime: value })
        return true;
    }
    handleChangeTableTime(plantSettingData, value) {
        let newTime = value.toString();
        let newPlantSettingData = plantSettingData;
        let tmpPlantSettingDataList = this.state.plantSettingList;

        newPlantSettingData = {
            ...newPlantSettingData,
            tableWaitTime: newTime
        }
        let newTableType = newPlantSettingData.tableType;
        for (let i = 0; i < tmpPlantSettingDataList.length; i++) {
            if (newTableType === tmpPlantSettingDataList[i].tableType) {
                tmpPlantSettingDataList[i] = newPlantSettingData;
                this.setState({
                    plantSettingList: tmpPlantSettingDataList
                })
                return true;
            }
        }
        return false;
    }
    handleChangeCheckFlag(plantSettingData, flag) {


        let newPlantSettingData = plantSettingData;
        let tmpPlantSettingDataList = this.state.plantSettingList;
        if (flag === 'table') {
            let newCheckFlag = (plantSettingData.tableUseChk === 'Y' ? 'N' : 'Y');
            newPlantSettingData = {
                ...newPlantSettingData,
                tableUseChk: newCheckFlag
            }
        } else if (flag === 'time') {
            let newCheckFlag = (plantSettingData.tableWaitTimeUseChk === 'Y' ? 'N' : 'Y');
            newPlantSettingData = {
                ...newPlantSettingData,
                tableWaitTimeUseChk: newCheckFlag
            }
        }
        let newTableType = newPlantSettingData.tableType;
        for (let i = 0; i < tmpPlantSettingDataList.length; i++) {
            if (newTableType === tmpPlantSettingDataList[i].tableType) {
                tmpPlantSettingDataList[i] = newPlantSettingData;
                this.setState({
                    plantSettingList: tmpPlantSettingDataList
                })
                return true;
            }
        }
        return false;

    }
    handleUpdatePlantSetting() {

        logSaveRequest('DEBUG', '[' + this.props.authData.currentId + '][PlantSettingTab TableSetting Button Click Event: Save Click');

        return this.props.plantSettingUpdateDataRequest(this.props.authData.currentId, this.state.plantSettingList).then(
            response => {
                if (response === true) {
                    this.handleGetPlantSetting();
                    return true;
                } else if (response === -1) {
                    let loginData = getCookie('key');
                    return this.handleLogin(loginData.id, loginData.password).then(
                        (reseponse) => {
                            if (reseponse) {
                                return this.props.plantSettingUpdateDataRequest(this.props.authData.currentId, this.state.plantSettingList).then(
                                    response => {
                                        if (response === true) { this.handleGetPlantSetting(); return true; }
                                    }
                                )
                            }
                        }
                    )
                } else {
                    console.log('DEBUG: 테이블세팅 업데이트 실패');
                    return false;
                }
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
    handleGetPlantSetting() {
        this.props.plantSettingGetDataRequest(this.props.authData.currentId).then(
            response => {
                if (response === true) {
                    this.handleSetData();
                }
            }
        )
    }
    componentDidMount() {
        // this.checkJWT();
        this.handleGetPlantSetting();
        this.handleGetPlantSettingTime();
        this.handleGetPlantSettingAlarm();
    }

    render() {
        const maptToPlantSettingData = (plantSettingData) => {
            return plantSettingData.map(
                (data, i) => {
                    return (
                        <PlantInformSettingView
                            plantSettingData={data} key={i}
                            onChangeTableCheckFlag={this.handleChangeCheckFlag}
                            onChangeTableTime={this.handleChangeTableTime}

                        />
                    )
                }
            )
        }
        const maptToPlantSettingAlarmData = (AlarmData) => {
            return AlarmData.map(
                (data, i) => {
                    return (
                        <PlantInformSettingAlarmView
                            alarmTalkData={data} key={i}
                            onRemoveData={this.handleRemoveAlarm}
                            onChangeAlarmData={this.handleChangeAlarm}
                        />
                    )
                }
            )
        }
        return (
            <div>
                <br />
                <Tabs style={plantSettingStyles.Tabs}>
                    <Tab label="테이블세팅" buttonStyle={plantSettingStyles.Button} >
                        <div>
                            <div>
                                <br />
                                <PlantSettingSaveButtonView
                                    onUpdatePlantSetting={this.handleUpdatePlantSetting}
                                    returnMessage={this.props.returnMessage}
                                    onGetPlantSetting={this.handleGetPlantSetting}
                                />
                            </div>
                            <div>

                                <Paper style={plantSettingStyles.Paper} zDepth={2}>
                                    {maptToPlantSettingData(this.state.plantSettingList)}
                                </Paper>
                            </div>

                        </div>
                    </Tab>
                    <Tab label="Time 세팅" buttonStyle={plantSettingStyles.Button}>
                        <div>
                            <PlantInformSettingTimeView
                                noshowTime={this.state.noshowTime}
                                onChangeNoshowTime={this.handleChangeNoshowTime}
                                onChangeMaxTime = {this.handleChangeMaxTime}
                                onUpdateTime={this.handleUpdateTime}
                            />
                        </div>
                    </Tab>
                    <Tab label="알림톡세팅" buttonStyle={plantSettingStyles.Button}>
                        <div>
                            <div>
                                <br />
                                <PlantInformAlarmSaveButtonView
                                    onUpdateAlarmData={this.handleUpdateAlarm}
                                    onGetAlarmData={this.handleGetPlantSettingAlarm}
                                    alarmReturnMessage={this.props.alarmReturnMessage}
                                />
                                <br />
                                <PlantInformAlarmAddButtonView
                                    onAddData={this.handleAddAlarm}
                                />
                            </div>
                            <div>
                                {maptToPlantSettingAlarmData(this.state.alarmTalkList)}
                            </div>
                        </div>
                    </Tab>

                </Tabs>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        plantSettingData: state.plantSetting.value.plantSettingList,
        alarmTalkList: state.plantSetting.value.alarmTalkList,
        returnMessage: state.plantSetting.value.tableReturnMessage,
        alarmReturnMessage: state.plantSetting.value.alarmReturnMessage,
        authData: state.authentication.value,
        loginStatus: state.authentication.login,
        noShowTime: state.plantSetting.value.updateNoshowTime,
        maxTime : state.plantSetting.value.updateMaxTime

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        // 여기선 dispatch 한것을 return 값으로 넣어주었기 때문에 위에서 .then을 사용할 수 있음. 
        plantSettingGetDataRequest: (id) => {
            return dispatch(plantSettingGetDataRequest(id))
        },
        plantSettingUpdateDataRequest: (id, plantSettingList) => {
            return dispatch(plantSettingUpdateDataRequest(id, plantSettingList))
        },
        plantSettingGetTimeRequest: (id) => {
            return dispatch(plantSettingGetTimeDataRequest(id))
        },
        plantSettingUpdateTimeRequest: (id, noshowtime, maxtime ) => {
            return dispatch(plantSettingUpdateTimeDataRequest(id, noshowtime , maxtime))
        },
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        loginRequest: (id, password) => {
            return dispatch(loginRequest(id, password))
        },
        setCurrentInform: (id, isLoggedIn, token) => {
            dispatch(setCurrentInform(id, isLoggedIn, token))
        },
        plantSettingGetAlarmDataRequest: (id) => {
            return dispatch(plantSettingGetAlarmDataRequest(id))
        },
        plantSettingUpdateAlarmDataRequest: (id, alarmList) => {
            return dispatch(plantSettingUpdateAlarmDataRequest(id, alarmList))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlantSettingTab);


