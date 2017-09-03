import React, { Component } from 'react';

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class SearchBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cellPhone:'',
            reservationNo:'',
            searchType:'cellPhone'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
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
        if (this.state.searchType === 'cellPhone') {
            this.setState({
                cellPhone: e.target.value
            })
            
        } else {
            this.setState({
                reservationNo: e.target.value
            })
        }
        this.props.onChangeSearchData(e.target.value);
    }

    render() {
        return (
            <div>
                <div>
                    <SelectField
                        floatingLabelText="SearchType"
                        value={this.state.searchType}
                        onChange={this.handleSearchTypeChange}
                    >
                        <MenuItem value={'cellPhone'} primaryText="Phone" />
                        <MenuItem value={'reservationNo'} primaryText="ReservationNo" />
                    </SelectField>
                </div>
                <div>
                    <TextField
                        floatingLabelText="Search"
                        onChange={this.handleChange}
                        value={this.state.searchType === 'cellPhone' ? this.state.cellPhone : this.state.reservationNo}
                    />
                    <RaisedButton primary={true} onClick={this.handleClear}>Clear</RaisedButton>
                </div>
            </div>
        );
    }
}

export default SearchBarView;