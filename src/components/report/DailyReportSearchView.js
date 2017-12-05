import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

class DailyReportSearchView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: false,
            endDate: false,
            successStatus: false
        }
        this.handleDisableStartDate = this.handleDisableStartDate.bind(this);
        this.handleDisableEndDate = this.handleDisableEndDate.bind(this);
        this.handleSearchList = this.handleSearchList.bind(this);

        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);

        this.selectEndDate = null;
        this.selectStartDate= null;
    }
    handleSearchList(){
        this.props.onGetStatisticList();
    }
    setStartDate(event,date){

        function dateToYYYYMMDD(date){
            function pad(num) {
                num = num + '';
                return num.length < 2 ? '0' + num : num;
            }
            return date.getFullYear() + '-' + pad(date.getMonth()+1) + '-' + pad(date.getDate());
        }
        
        this.selectStartDate = dateToYYYYMMDD(date);
        this.props.onSetDailyDate("start",this.selectStartDate);
       
    }
    setEndDate(event,date){
        function dateToYYYYMMDD(date){
            function pad(num) {
                num = num + '';
                return num.length < 2 ? '0' + num : num;
            }
            return date.getFullYear() + '-' + pad(date.getMonth()+1) + '-' + pad(date.getDate());
        }
        
        this.selectEndDate = dateToYYYYMMDD(date);
        this.props.onSetDailyDate("end",this.selectEndDate);
    }
    
    handleDisableStartDate(date){
        let limitDate = new Date();
      
        if(this.selectEndDate ===null)
            return date>limitDate;
        else
            return date>new Date(this.selectEndDate);
    }
    handleDisableEndDate(date){
     
        let limitDate = new Date();
        if(this.selectStartDate ===null)
            return date>limitDate;
        else    
            return date<new Date(this.selectStartDate);
        
    }
    render() {
        return (
            <div>
                
                <DatePicker hintText="조회 시작일"  mode="landscape" onChange={(event, date) => this.setStartDate(event,date)}  autoOk={true} shouldDisableDate={this.handleDisableStartDate}/>
                <DatePicker hintText="조회 종료일"  mode="landscape" onChange={(event, date) => this.setEndDate(event,date)} autoOk={true} shouldDisableDate={this.handleDisableEndDate}/>
                <RaisedButton primary={true} onClick={this.handleSearchList}>조회</RaisedButton>
            </div>
        );
    }
}

DailyReportSearchView.propTypes = {

};

export default DailyReportSearchView;