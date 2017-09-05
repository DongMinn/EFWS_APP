import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import SweetAlert from 'sweetalert-react';

class PlantInformAlarmSaveButtonView extends Component {
    render() {
        return (
            <div>
            <RaisedButton primary={true} onClick={this.handleClick}>저장</RaisedButton>
            </div>
        );
    }
}

PlantInformAlarmSaveButtonView.propTypes = {

};

export default PlantInformAlarmSaveButtonView;