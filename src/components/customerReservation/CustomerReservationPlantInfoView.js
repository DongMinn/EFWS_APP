import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

class CustomerReservationPlantInfoView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>

                {this.props.plantInfo.plantName}/{this.props.plantInfo.plantTelNo}
            </div>
        );
    }
}

CustomerReservationPlantInfoView.propTypes = {

};

export default CustomerReservationPlantInfoView;