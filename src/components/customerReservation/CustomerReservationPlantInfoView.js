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

                {this.props.plantInfo.plantName}/
                <a href="tel:{this.props.plantInfo.plantTelNo}">{this.props.plantInfo.plantTelNo}</a>
            </div>
        );
    }
}

export default CustomerReservationPlantInfoView;