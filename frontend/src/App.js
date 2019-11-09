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
          <Route path='/day' component={BarChartbyDay}/>
          <Route path='/hour' component={BarChartbyHour}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
