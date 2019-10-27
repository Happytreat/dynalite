import React from 'react';
import { Bar } from 'react-chartjs-2';
import color from 'rcolor';
import styled from 'styled-components';

import { fetchOccupancyData } from '../dataMethods/fetchData';

const GraphArea = styled.div`
	width: 1000px;
	height: 600px;
`

const initialState = {
  labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
		label: 'Room Occupancy',
		backgroundColor: color(),
		borderColor: color(),
		borderWidth: 1,
		hoverBackgroundColor: color(),
		hoverBorderColor: color(),
		data: [0.65, 0.59, 0.80, 0.81, 0.56, 0.55, 0.40, 0.10]
    }
  ]
};

class BarChart extends React.Component {
	async componentWillMount(){
		this.setState(initialState); 
		const data = await fetchOccupancyData();
		console.log(data);
	}

	render() {
		return (
			<GraphArea>
				<Bar data={this.state}/>
			</GraphArea>
		);
	}
}

export default BarChart;