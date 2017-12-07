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

import { styles,  dialogStyle,  } from '../../common/styles';


class DailyReportView extends Component {
	constructor(props) {
		super(props)
		this.state = {	
			
		}
		this.handleleaveRate = this.handleleaveRate.bind(this);
		this.handleMaxMinWait = this.handleMaxMinWait.bind(this);
		this.handleSaleDate = this.handleSaleDate.bind(this);
		this.handleFirstLastWait = this.handleFirstLastWait.bind(this);

	}
	handleSaleDate(saleDate){
		
		return saleDate.substr(4,2)+'/'+saleDate.substr(6,2);
	}
	handleleaveRate(rate) {
		
		
		return Math.round(rate * 100) + '%';
	}
	handleMaxMinWait(minute, orderTime) {
		if (orderTime !== null)
			return minute + '분(' + (orderTime.substr(11, 5)) + ')';
		else {
			return '분';
		}

	}
	handleFirstLastWait(orderTime) {
		if (orderTime !== null)
			return orderTime.substr(11, 5);
		else {
			return '';
		}
	}
	
	

	render() {

		const statisticList = (
			<Table
				height="1000px"
			>
				<TableHeader
					displaySelectAll={false}
					adjustForCheckbox={false}
					style={NoshowListStyle.headerBack}
				>
					<TableRow>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>매장코드</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>날짜</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>총사용</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>총입장</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>총노쇼</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>이탈률</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>평균대기</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>최대대기</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>최소대기</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>최초대기</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>최종대기</TableHeaderColumn>


					</TableRow>
				</TableHeader>
				<TableBody
					displayRowCheckbox={false}
				>
					{
						this.props.statisticList.map((data, i) => (
							<TableRow key={i}>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.plantCode}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{this.handleSaleDate(data.saleDate)}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.totalCustomer}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.totalEntrance}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.totalNoshow}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{this.handleleaveRate(data.leaveRate)}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.avgWaitTime}분</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{this.handleMaxMinWait(data.maxWaitTime, data.maxWaitOrderTime)}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{this.handleMaxMinWait(data.minWaitTime, data.minWaitOrderTime)}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{this.handleFirstLastWait(data.firstWaitOrderTime)}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{this.handleFirstLastWait(data.lastWaitOrderTime)}</TableRowColumn>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		)

		
		return (
			<div>

				{statisticList}
			

			</div>
		);
	}
}

DailyReportView.propTypes = {

};

export default DailyReportView;