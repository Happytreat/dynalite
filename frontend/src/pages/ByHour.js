import React from 'react';
import styled from 'styled-components';
import BarChartbyHour from '../containers/HourBarChart';
import { NavBar } from '../containers/Navbar/Navbar';

import { Typography } from 'antd';

const { Title } = Typography;


const BarChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
`

const ByHourPage = () => {
    return (
        <>
            <NavBar />
            <Typography style={{textAlign: 'center', paddingTop: '5rem'}}>
                <Title level={3}>A project brought to you by Team Dynalite.</Title>
            </Typography>
            <BarChartWrapper> 
                <BarChartbyHour />
            </BarChartWrapper>
        </>
    )
}

export default ByHourPage;