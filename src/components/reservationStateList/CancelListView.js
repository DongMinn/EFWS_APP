import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { NoshowListStyle } from '../../common/styles'
import SweetAlert from 'sweetalert-react';


class CancelListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show:false,
      failStatus:false,
      successStatus:false
    }
  }
 
  render() {
    

    const cancellist = (
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
          
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {
            this.props.cancelList.map((data, i) => (
              <TableRow key={i}>
                <TableRowColumn style={NoshowListStyle.rowStyle}>{data.waitingNo}</TableRowColumn>
                <TableRowColumn style={NoshowListStyle.rowStyle}>{data.waitingState}</TableRowColumn>
                <TableRowColumn style={NoshowListStyle.rowStyle}>{data.reservationOrderTime}</TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
    return (
      <div>
        
        {cancellist}
       
      </div>
    );
  }
}

CancelListView.propTypes = {

};

export default CancelListView;