import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'

import { ConfPage, HomePage, TransactionPage } from './pages'
import { ConfProvider } from './ConfProvider'
import { Header } from './Header'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <ConfProvider>
        <Router>
          <Header />
          <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/conf" component={ConfPage} />
            <Route path="/tx/:tx" component={TransactionPage} />
          </Switch>
    </Container>
        </Router>
      </ConfProvider>
    </div>
  )
}

export default App
