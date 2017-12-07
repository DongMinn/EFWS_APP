import React, { Component } from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';


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

            isLoggedIn:'',
            loginId:'',

            pageCheck:true

        }
        this.handleLinkToReservation = this.handleLinkToReservation.bind(this);
        this.handleLinkToChangeInform = this.handleLinkToChangeInform.bind(this);
        this.handleLoginRole = this.handleLoginRole.bind(this);
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
    handleLoginRole(){
        
        if(this.state.loginId.indexOf("ADMIN")!==-1){
            if(this.state.isLoggedIn===true){
                this.setState({
                    pageCheck:false
                })
            }
        }else{
            this.setState({
                pageCheck:true
            })
        }
        
    }
    componentDidMount() {
        this.setState({
            isLoggedIn:this.props.isLoggedIn,
            loginId:this.props.loginId
        })
        
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoggedIn: nextProps.isLoggedIn,
            loginId: nextProps.loginId
        })
        this.handleLoginRole();
    };
    
    render() {
        const menuList = (
            <Tabs style={NoshowListStyle.headerStyle}>
                <Tab label="예약확인" onClick={this.handleLinkToReservation}> </Tab>
                <Tab label="상태리스트" onClick={() => { this.handleLinkToChangeInform('reservestatelist') }}> </Tab>
                <Tab label="비번변경" onClick={() => { this.handleLinkToChangeInform('password') }}> </Tab>
                <Tab label="매장정보" onClick={() => { this.handleLinkToChangeInform('information') }}> </Tab>
                <Tab label="통계" onClick={() => { this.handleLinkToChangeInform('statistics') }}> </Tab>
                <Tab label="설정" onClick={() => { this.handleLinkToChangeInform('setting') }}> </Tab>

            </Tabs>
        )
        const adminMenuList = (
            <Tabs style={NoshowListStyle.headerStyle}>
              
                <Tab label="비번변경" onClick={() => { this.handleLinkToChangeInform('password') }}> </Tab>
                <Tab label="통계" onClick={() => { this.handleLinkToChangeInform('statistics') }}> </Tab>
                

            </Tabs>
        )
        return (
            <div >
            
                {this.state.pageCheck ?
                    menuList
                    : adminMenuList
                }
            </div>



        );
    }
}

export default MenuBar;

// {this.state.isLoggedIn ?
//     menuList
//     : undefined
// }