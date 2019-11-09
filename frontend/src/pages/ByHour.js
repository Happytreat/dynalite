import React from 'react';
import styled from 'styled-components';
import BarChartbyHour from '../containers/HourBarChart';
import { NavBar } from '../containers/Navbar/Navbar';

import { Button, Typography } from 'antd';

const { Text, Title } = Typography;


const BarChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
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
            <div style={{width: '512px', maxWidth: '90%', margin: 'auto', marginBottom: '1.5rem'}}>
                <Text style={{fontSize: '1.1rem', lineHeight: '1.6rem'}}>
                    Dynalite is an Internet-of-Things application which performs dynamic visualisation of room occupancy. Dynalite uses one or more Raspberry Pis to measure room occupancy and a NodeJS-Express-PostgreSQL web server to store and visualise the measured data. Communication betwene the Pis and the server is implemented using COAP.
                </Text>
            </div>
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
                <Button type='primary' icon='api' href='https://www.evantay.com/tech/dynalite-api/'
                        style={{margin: '0.4rem'}}>
                    Backend API
                </Button>
                <Button type='primary' icon='github' href='https://github.com/Happytreat/dynalite'
                        style={{margin: '0.4rem'}}>
                    Github repo
                </Button>
            </div>
        </>
    )
}

export default ByHourPage;