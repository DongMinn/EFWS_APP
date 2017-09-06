import React, { Component } from 'react';

import { PlantInformSettingView, PlantSettingSaveButtonView } from '../components';
import { connect } from 'react-redux';
import { plantSettingGetDataRequest, plantSettingUpdateDataRequest } from '../actions/plantSetting';
import { getStatusRequest, setCurrentInform, loginRequest } from '../actions/authentication'
import { getCookie } from '../common/common';
import axios from 'axios';


class PlantSetting extends Component {
    constructor(props){
        super(props);
        this.State={
            plantSettingList:[]
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.checkJWT = this.checkJWT.bind(this);

        this.handleGetPlantSetting = this.handleGetPlantSetting.bind(this);
        this.handleSetData = this.handleSetData.bind(this);
        this.handleUpdatePlantSetting = this.handleUpdatePlantSetting.bind(this);
        this.handleChangeCheckFlag = this.handleChangeCheckFlag.bind(this);
        this.handleChangeTableTime = this.handleChangeTableTime.bind(this);
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
                    return true;
                }
                else {
                    return false;
                }
            }
        )
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
        debugger;
        this.props.plantSettingGetDataRequest(this.props.authData.currentId).then(
            response => {
                if (response === true) {
                    this.handleSetData();
                }
            }
        )
    }
    componentDidMount() {
        debugger;
        this.checkJWT();
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
                            onChangeTimeCheckFlag={this.handleChangeCheckFlag}
                        />
                    )
                }
            )
        }
        return (
            <div>
                {maptToPlantSettingData(this.state.plantSettingList)}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        plantSettingData: state.plantSetting.value.plantSettingList,
        alarmTalkList: state.plantSetting.value.alarmTalkList,
        returnMessage: state.plantSetting.value.returnMessage,
        authData: state.authentication.value,
        loginStatus: state.authentication.login,
        noShowTime: state.plantSetting.value.updateNoshowTime
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
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        loginRequest: (id, password) => {
            return dispatch(loginRequest(id, password))
        },
        setCurrentInform: (id, isLoggedIn, token) => {
            dispatch(setCurrentInform(id, isLoggedIn, token))
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlantSetting);
