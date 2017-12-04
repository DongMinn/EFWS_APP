import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';
import Divider from 'material-ui/Divider';

import { NoshowListStyle } from '../common/styles'

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reserveCheck: false,
            passwordCheck: false,
            infoCheck: false,
            settingCheck: false,
            noshowCheck: false,
            reportCheck: false,

        }
        this.handleLinkToReservation = this.handleLinkToReservation.bind(this);
        this.handleLinkToChangeInform = this.handleLinkToChangeInform.bind(this);


    }

    handleLinkToReservation() {
        browserHistory.push('/reservationstate')
        this.setState({
            reserveCheck: true,
            passwordCheck: false,
            infoCheck: false,
            settingCheck: false,
            noshowCheck: false,
        })
    }
    handleLinkToChangeInform(state) {
        this.setState({
            passwordCheck: false,
            reserveCheck: false,
            infoCheck: false,
            settingCheck: false,
            noshowCheck: false,
        })
        if (state === 'reservestatelist') {
            browserHistory.push('/reservestatelist')
            this.setState({
                noshowCheck: true,
            })
        }
        else if (state === 'password') {
            browserHistory.push('/change/password')
            this.setState({
                passwordCheck: true,
            })
        } else if (state === 'information') {
            browserHistory.push('/change/information')
            this.setState({
                infoCheck: true,
            })
        }
        else if (state === 'report') {
            this.setState({
                reportCheck: true,
            })
        }else if (state === 'statistics') {
            browserHistory.push('/statistics')
        }
        else {
            browserHistory.push('/change/setting')
            this.setState({
                settingCheck: true,
            })
        }
    }
    render() {
        return (
            <div >
            <br/>
                {this.props.isLoggedIn ?

                    <Tabs style={NoshowListStyle.headerStyle}>
                        <Tab label="예약확인" onClick={this.handleLinkToReservation}> </Tab>
                        <Tab label="상태리스트" onClick={() => { this.handleLinkToChangeInform('reservestatelist') }}> </Tab>
                        <Tab label="비번변경" onClick={() => { this.handleLinkToChangeInform('password') }}> </Tab>
                        <Tab label="매장정보" onClick={() => { this.handleLinkToChangeInform('information') }}> </Tab>
                        
                        <Tab label="설정" onClick={() => { this.handleLinkToChangeInform('setting') }}> </Tab>

                    </Tabs>
                    : undefined
                }
            </div>



        );
    }
}

export default MenuBar;


// <MenuItem primaryText="Reports" rightIcon={<ArrowDropRight />} checked={this.state.reportCheck}
// menuItems={[
//             <MenuItem primaryText="일별 레포트" onClick={() => { this.handleLinkToChangeInform('dailyreport') }}/>,
//             <MenuItem primaryText="월별 레포트" onClick={() => { this.handleLinkToChangeInform('monthlyreport') }}/>,
//             <MenuItem primaryText="빅데이터 시간 세팅" onClick={() => { this.handleLinkToChangeInform('bigdatasetting') }}/>,
// ]}
// />

//<Tab label="통계" onClick={() => { this.handleLinkToChangeInform('statistics') }}> </Tab>