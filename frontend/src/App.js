import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BarChartbyDay from './pages/ByDay';
import BarChartbyHour from './pages/ByHour';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    // TODO: Get name and version from env
    console.log('Dynalite client: v0.1.0');

    return (
      <BrowserRouter>
        <Switch>
          <Route path={`${process.env.REACT_APP_BASENAME}day`} component={BarChartbyDay}/>
          <Route path={`${process.env.REACT_APP_BASENAME}hour`} component={BarChartbyHour}/>
          <Route component={BarChartbyDay} /> 
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
