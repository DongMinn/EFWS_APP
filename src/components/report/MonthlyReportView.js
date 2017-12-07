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


class MonthlyReportView extends Component {
	constructor(props) {
		super(props)
		this.state = {	
			
		}
		this.handleleaveRate = this.handleleaveRate.bind(this);

	}

	handleleaveRate(rate) {
		
		
		return Math.round(rate * 100) + '%';
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
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>평균이탈률</TableHeaderColumn>
						<TableHeaderColumn style={NoshowListStyle.headerStyle}>평균대기</TableHeaderColumn>
					


					</TableRow>
				</TableHeader>
				<TableBody
					displayRowCheckbox={false}
				>
					{
						this.props.statisticList.map((data, i) => (
							<TableRow key={i}>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.plantCode}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.saleMonth}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.totalCustomer}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.totalEntrance}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.totalNoshow}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{this.handleleaveRate(data.leaveRate)}</TableRowColumn>
								<TableRowColumn style={NoshowListStyle.statisticRowStyle}>{data.avgWaitTime}분</TableRowColumn>
							
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

MonthlyReportView.propTypes = {

};

export default MonthlyReportView;