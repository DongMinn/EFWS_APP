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
import { NoshowListStyle } from '../../common/styles'
import SweetAlert from 'sweetalert-react';


class NoShowListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show:false,
      failStatus:false,
      successStatus:false
    }
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }
  handleUpdateState(data, state) {
    
      this.props.onUpdateReserveState(data, state)
   
  }
  render() {
    const ConfirmView = (
      <div>
          <SweetAlert
              show={this.state.show}
              title="NoShow 상태 복원"
              text={'[NOSHOW] 상태를 [입장대기]로 변경하시겠습니까?'}
              showCancelButton
              onConfirm={this.handleUpdateNoshowTime}
              onCancel={() => {
                  this.setState({
                      show: false,
                  });
              }}
          />
      </div>
  );
  const changeSuccessedView = (
      <div>
          <SweetAlert
              show={this.state.successStatus}
              title="매장세팅 변경 완료!"
              // text=""
              onConfirm={() => {
                  this.setState({ successStatus: false });
              }}
          />
      </div>
  );
  const changeFailedView = (
      <div>
          <SweetAlert
              show={this.state.failStatus}
              title="매장세팅 변경 실패!"
              text={this.props.returnMessage}
              onConfirm={() => {

                  this.setState({ failStatus: false });
                  this.props.onGetPlantSetting();
              }}
          />
      </div>
  );

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
            <TableHeaderColumn style={NoshowListStyle.headerStyle}>복구하기</TableHeaderColumn>
            <TableHeaderColumn style={NoshowListStyle.headerStyle}>입장하기</TableHeaderColumn>
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
                  <RaisedButton onClick={() => { this.handleUpdateState(data, 'WAIT') }}>변경</RaisedButton>
                </TableRowColumn>
                <TableRowColumn style={NoshowListStyle.rowStyle}>
                  <RaisedButton onClick={() => { this.handleUpdateState(data, 'ENTRANCE') }}>입장</RaisedButton>
                </TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    )
    return (
      <div>
        
        {noshowlist}
        {ConfirmView}
        {changeSuccessedView}
        {changeFailedView}
      </div>
    );
  }
}

NoShowListView.propTypes = {

};

export default NoShowListView;