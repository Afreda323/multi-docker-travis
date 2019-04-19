import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MainPage from './MainPage'
import OtherPage from './OtherPage'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>FIBONACCI</p>
          </header>
          <Link to={'/'}>Home</Link>
          <Link to={'/other'}>Other Page</Link>
          <div style={{padding: '8px 30px 30px'}}>
            <Route exact path={'/'} component={MainPage} />
            <Route exact path={'/other'} component={OtherPage} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
