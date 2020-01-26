import React from 'react'
import { Link, HashRouter as Router, Switch, Route } from 'react-router-dom'

import { ConfPage, HomePage, TransactionPage } from './pages'
import { ConfProvider } from './ConfProvider'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <ConfProvider>
        <Router>
          <nav>
            <Link to="/">Home</Link>
            {' '}
            <Link to="/conf">Conf</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/conf" component={ConfPage} />
            <Route path="/tx/:tx" component={TransactionPage} />
          </Switch>
        </Router>
      </ConfProvider>
    </div>
  )
}

export default App
