import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { styles } from '../common/styles';
import { browserHistory } from 'react-router';
import Divider from 'material-ui/Divider';


class MenuBar extends Component {
    constructor(props){
        super(props);
        this.state={
            reserveCheck:false,
            passwordCheck:false,
            infoCheck:false,
            settingCheck:false,

        }
        this.handleLinkToReservation = this.handleLinkToReservation.bind(this);
        this.handleLinkToChangeInform= this.handleLinkToChangeInform.bind(this);
        

    }
    
    handleLinkToReservation() {
        browserHistory.push('/reservationstate')
        this.setState({
            reserveCheck:true,
            passwordCheck:false,
            infoCheck:false,
            settingCheck:false,
        })
    }
    handleLinkToChangeInform(state){
       if(state==='password'){
            browserHistory.push('/change/password')
            this.setState({
            passwordCheck:true,
            reserveCheck:false,
            infoCheck:false,
            settingCheck:false,
        })
       }else if(state==='information'){
           browserHistory.push('/change/information')
           this.setState({
            infoCheck:true,
            passwordCheck:false,
            reserveCheck:false,
            settingCheck:false,
        })
       }else {
            browserHistory.push('/change/setting')
            this.setState({
            settingCheck:true,
            passwordCheck:false,
            infoCheck:false,
            reserveCheck:false,
        })
       }    
    }
    render() {
        return (
                <div className="common_header">
                    { this.props.isLoggedIn ?
                        <Menu >
                            <MenuItem primaryText="예약확인" onClick={this.handleLinkToReservation} checked={this.state.reserveCheck}/>
                            <Divider/>
                            <MenuItem primaryText="비밀번호변경"   onClick={()=>{this.handleLinkToChangeInform('password')} } checked={this.state.passwordCheck}/>
                            <MenuItem primaryText="매장정보변경"  onClick={()=>{this.handleLinkToChangeInform('information')}} checked={this.state.infoCheck}/>
                            <MenuItem primaryText="Settings"   onClick={()=>{this.handleLinkToChangeInform('setting')}} checked={this.state.settingCheck}/>
                            <Divider/>
                        </Menu>                                                                                                                                          
                        : undefined
                    }
                </div>
           );
    }
}

export default MenuBar;