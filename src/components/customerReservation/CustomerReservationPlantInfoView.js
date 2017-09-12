import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../css/customerReserve.scss';

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
            <div id="customerPlantInfo">

                {this.props.plantInfo.plantName}
                <br/>
                <a href={this.handlePhoneNo()}>{this.props.plantInfo.plantTelNo}</a>
            </div>
        );
    }
}

export default CustomerReservationPlantInfoView;