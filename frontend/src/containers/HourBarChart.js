import React from 'react';
import { Bar } from 'react-chartjs-2';
import color from 'rcolor';
import styled from 'styled-components';

import { 
	fetchOccupancyData, batchOccupancyByHour, exportOccupancyData 
} from '../dataMethods/occupancy';

const GraphArea = styled.div`
	width: 768px;
	max-width: 90%;
`

class BarChartByHour extends React.Component {
	constructor() {
		super()
		this.state = {
			labels: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am',
					 '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
					]
		};
	}

	async getUpdatedData() {
		const data = await fetchOccupancyData();
		console.log(batchOccupancyByHour(data))
		return exportOccupancyData(batchOccupancyByHour(data));
	}

	componentDidMount(){
		this.getUpdatedData().then(data => this.setState({
			datasets: [
				{
					label: 'Room Occupancy (Hourly)',
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