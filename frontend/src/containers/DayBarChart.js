import React from 'react';
import { Bar } from 'react-chartjs-2';
import color from 'rcolor';
import styled from 'styled-components';

import { 
	fetchOccupancyData, batchOccupancyByDay, exportOccupancyData 
} from '../dataMethods/occupancy';

const GraphArea = styled.div`
	width: 768px;
	height: 512px;
	max-width: 90%;
`

class BarChartByDay extends React.Component {
	constructor() {
		super()
		this.state = {
			labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
		};
	}

	async getUpdatedData() {
		const data = await fetchOccupancyData();
		return exportOccupancyData(batchOccupancyByDay(data));
	}

	componentDidMount(){
		this.getUpdatedData().then(data => this.setState({
			datasets: [
				{
					label: 'Room occupancy (Daily)',
					backgroundColor: color(),
					borderColor: color(),
					borderWidth: 1,
					hoverBackgroundColor: color(),
					hoverBorderColor: color(),
					data
				}
			]
		}))
	}

	render() {
		return (
			<GraphArea>
				<Bar data={this.state}/>
			</GraphArea>
		);
	}
}

export default BarChartByDay;