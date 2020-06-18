import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Normal from './components/Normal'
import Frecuencia from './components/Frecuencia'
import Series from './components/Series'
import KolmogorovSmirnov from './components/KolmogorovSmirnov'
import Poker from './components/Poker'


class App extends Component {
  render() { 
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} /> 
          <div className="container">
            <Route exact path="/normal" component={Normal} />
            <Route exact path="/frecuencia" component={Frecuencia} />
            <Route exact path="/series" component={Series} />
            <Route exact path="/kolmogorov-smirnov" component={KolmogorovSmirnov} />
            <Route exact path="/poker" component={Poker} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App

