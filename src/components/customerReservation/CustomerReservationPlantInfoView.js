import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

class CustomerReservationPlantInfoView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handlePhoneNo = this.handlePhoneNo.bind(this);
    }
    handlePhoneNo(){
        let no=this.props.plantInfo.plantTelNo
        return "tel:"+no
    }
    render() {
        return (
            <div>

                {this.props.plantInfo.plantName}/
                <a href="tel:0220299771">{this.props.plantInfo.plantTelNo}</a>
            </div>
        );
    }
}

export default CustomerReservationPlantInfoView;