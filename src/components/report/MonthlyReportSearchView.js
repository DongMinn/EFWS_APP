import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import SweetAlert from 'sweetalert-react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class MonthlyReportSearchView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            value: '',
            successStatus: false,
            failStatus: false
        }

        this.handleSearchList = this.handleSearchList.bind(this);
        this.handleChangeMonth  = this.handleChangeMonth.bind(this);
    
        this.handlePopup = this.handlePopup.bind(this);
    }
    handleChangeMonth(event, index, value) {
        this.selectStartDate = value;
        this.props.onSetMonthlyDate(this.selectStartDate);
        this.setState({
            value: parseInt(this.selectStartDate, 10)
        })

    }
    handlePopup() {
        this.setState({ failStatus: false })
        this.props.onFailStatus();
    }
    handleSearchList() {
        this.props.onGetStatisticList()
    }
   
  
    componentWillReceiveProps(nextProps) {
        this.setState({
            failStatus: nextProps.failStatus,

        })
    }
    componentDidMount() {
        let dates = new Date();
        this.selectStartDate = dates.getFullYear();
        this.props.onSetMonthlyDate(this.selectStartDate);
        this.setState({
            value: parseInt(this.selectStartDate, 10)
        })
        
    }
    

    render() {
        const items = [];
        for (let i = 2011; i < 2050; i++) {
            items.push(<MenuItem value={i} key={i} primaryText={`${i} 년`} />);
        }
        const searchFailedView = (
            <div>
                <SweetAlert
                    show={this.state.failStatus}
                    title="조회 결과 없음"
                    text="조회 날짜를 다시 선택하세요."
                    onConfirm={this.handlePopup}
                />
            </div>
        );
        return (

            <div>
                {searchFailedView}
                전 월까지 데이터가 조회됩니다.
                <div>

                    <DropDownMenu maxHeight={200}  value={this.state.value} onChange={this.handleChangeMonth}>
                        {items}
                    </DropDownMenu>

                    <RaisedButton primary={true} onClick={this.handleSearchList}>조회</RaisedButton>
                </div>
            </div>
        );
    }
}

MonthlyReportSearchView.propTypes = {

};

export default MonthlyReportSearchView;