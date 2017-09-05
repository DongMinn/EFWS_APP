import React, { Component } from 'react';
import PropTypes from 'prop-types';


import RaisedButton from 'material-ui/RaisedButton';
import SweetAlert from 'sweetalert-react';

class PlantInformAlarmAddButtonView extends Component {
    constructor(props){
        super(props);
        this.state={

        }
        this.handleAddData = this.handleAddData.bind(this);
    }
    handleAddData(){
        this.props.onAddData();
    }
    render() {
        return (
            <div>
                <RaisedButton primary={true} onClick={this.handleAddData}>추가</RaisedButton>
            </div>
        );
    }
}

PlantInformAlarmAddButtonView.propTypes = {

};

export default PlantInformAlarmAddButtonView;