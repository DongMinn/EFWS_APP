import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmptyReserveData extends Component {
    render() {
        return (
            <div>
                고객데이터가 없습니다.
            </div>
        );
    }
}

EmptyReserveData.propTypes = {

};

export default EmptyReserveData;