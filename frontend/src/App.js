import React, { Component } from 'react'
import styled from 'styled-components';
import BarChart from './containers/BarChart';
import { NavBar } from './containers/Navbar';
import 'antd/dist/antd.css';

import { Typography } from 'antd';

const { Title } = Typography;


const BarChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
`

class App extends Component {
  render() {
    // TODO: Get name and version from env
    console.log('Dynalite client: v1.0.0');

    return (
      <>
        <NavBar />
        <Typography style={{textAlign: 'center', paddingTop: '5rem'}}>
          <Title level={3}>A project brought to you by Team Dynalite.</Title>
        </Typography>
        <BarChartWrapper> 
          <BarChart />
        </BarChartWrapper>
      </>
    );
  }
}

export default App;
