import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { NoshowListStyle } from '../common/styles'

class NoShowListView extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }
  handleUpdateState(data, state) {
    if (state === 'CALL') {
      this.props.onUpdateReserveState(data, state)
    } 
  }
  render() {
    const noshowlist = (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          style={NoshowListStyle.headerBack}
        >
          <TableRow>
            <TableHeaderColumn style={NoshowListStyle.headerStyle}>예약번호</TableHeaderColumn>
            <TableHeaderColumn style={NoshowListStyle.headerStyle}>예약상태</TableHeaderColumn>
            <TableHeaderColumn style={NoshowListStyle.headerStyle}>예약시간</TableHeaderColumn>
            <TableHeaderColumn style={NoshowListStyle.headerStyle}>UPDATE</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {
            this.props.noshowList.map((data, i) => (
              <TableRow key={i}>
                <TableRowColumn style={NoshowListStyle.rowStyle}>{data.waitingNo}</TableRowColumn>
                <TableRowColumn style={NoshowListStyle.rowStyle}>{data.waitingState}</TableRowColumn>
                <TableRowColumn style={NoshowListStyle.rowStyle}>{data.reservationOrderTime}</TableRowColumn>
                <TableRowColumn style={NoshowListStyle.rowStyle}>
                  <RaisedButton onClick={() => { this.handleUpdateState(data, 'CALL') }}>변경하기</RaisedButton>
                </TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
    return (
      <div>
        <br />
        {noshowlist}
      </div>
    );
  }
}

NoShowListView.propTypes = {

};

export default NoShowListView;