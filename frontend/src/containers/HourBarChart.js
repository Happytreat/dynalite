import React from 'react';
import { Bar } from 'react-chartjs-2';
import color from 'rcolor';
import styled from 'styled-components';

import { 
	fetchOccupancyData, batchOccupancyByDay, exportOccupancyData 
} from '../dataMethods/occupancy';

const GraphArea = styled.div`
	width: 1000px;
	height: 600px;
`

class BarChartByHour extends React.Component {
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
					label: 'Room Occupancy by Hour',
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

export default BarChartByHour;