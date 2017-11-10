import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { browserHistory } from 'react-router';
import Divider from 'material-ui/Divider';


class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reserveCheck: false,
            passwordCheck: false,
            infoCheck: false,
            settingCheck: false,
            noshowCheck: false,
            reportCheck:false,

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
        if (state === 'noshow') {
            browserHistory.push('/change/noshow')
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
            <div className="common_header">
                {this.props.isLoggedIn ?
                    <Menu >
                        <MenuItem primaryText="예약확인" onClick={this.handleLinkToReservation} checked={this.state.reserveCheck} />
                        <Divider />
                        <MenuItem primaryText="NOSHOW리스트" onClick={() => { this.handleLinkToChangeInform('noshow') }} checked={this.state.noshowCheck} />
                        <MenuItem primaryText="비밀번호변경" onClick={() => { this.handleLinkToChangeInform('password') }} checked={this.state.passwordCheck} />
                        <MenuItem primaryText="매장정보변경" onClick={() => { this.handleLinkToChangeInform('information') }} checked={this.state.infoCheck} />
                        <MenuItem primaryText="Settings" onClick={() => { this.handleLinkToChangeInform('setting') }} checked={this.state.settingCheck} />
                       
                    </Menu>
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