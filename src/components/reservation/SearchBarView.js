import React, { Component } from 'react';

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class SearchBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cellPhone: '',
            reservationNo: '',
            searchType: 'reservationNo'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
        this.handleRadioButton = this.handleRadioButton.bind(this);
        this.handleRadioValue = this.handleRadioValue.bind(this);
    }
    handleRadioValue(i){
        let value=parseInt(i,10);
        if(value===1){
            return `전체`
        }else{
            return `${value}인석`
        }
    }
    handleRadioButton(event , value){
        console.log(value);
        //여기서 값 불러오기 시전하면됨.
    }
    handleSearchTypeChange(event, index, value) {
        this.setState({
            searchType: value
        })
        this.props.onChangeSearchType(value);
    }
    handleClear() {
        this.setState({
            cellPhone: '',
            reservationNo: ''
        })
        this.props.onClearData();
    }
    handleChange(e) {
        // if (this.state.searchType === 'cellPhone') {
        //     this.setState({
        //         cellPhone: e.target.value
        //     })

        // } else {
        this.setState({
            reservationNo: e.target.value
        })
        // }
        this.props.onChangeSearchData(e.target.value);
    }
    render() {
        const items = [];
        items.push(<RadioButton value={"1"} label={this.handleRadioValue("1")} />);
        for (let i = 0; i < this.props.plantSettingList.length; i++) {
            if(this.props.plantSettingList[i].tableUseChk==='Y'){
                items.push(<RadioButton value={this.props.plantSettingList[i].tableType} key={i} label={this.handleRadioValue(this.props.plantSettingList[i].tableType)} />);
            }            
        }
        return (
            <div>
                <div>
                    <SelectField
                        floatingLabelText="검색구분"
                        value={'reservationNo'}
                        onChange={this.handleSearchTypeChange}
                        disabled={true}
                    >
                        <MenuItem value={'reservationNo'} primaryText="대기번호" />
                    </SelectField>
                </div>
                <div>
                    <TextField
                        floatingLabelText="Search"
                        onChange={this.handleChange}
                        value={this.state.searchType === 'cellPhone' ? this.state.cellPhone : this.state.reservationNo}
                    />
                    <RaisedButton primary={true} onClick={this.handleClear}>Clear</RaisedButton>
                    <div>
                        <RadioButtonGroup name="shipSpeed" defaultSelected={"1"} onChange={this.handleRadioButton}>
                            {items}
                        </RadioButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBarView;


// <RadioButton
//                                 value="total"
//                                 label="전체"
//                             />
//                             <RadioButton
//                                 value="2"
//                                 label="2인석"
//                             />
//                             <RadioButton
//                                 value="4"
//                                 label="4인석"
//                             />
//                             <RadioButton
//                                 value="6"
//                                 label="6인석"
//                             />
//                             <RadioButton
//                                 value="8"
//                                 label="8인석"
//                             />