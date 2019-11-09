import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BarCharts from './pages/BarCharts';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    // TODO: Get name and version from env
    console.log('Dynalite client: v0.1.0');

    return (
      <BrowserRouter>
        <Switch>
          <Route component={BarCharts} /> 
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
