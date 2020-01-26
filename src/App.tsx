import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'

import { ConfPage, HomePage, TransactionPage } from './pages'
import { WrappedWeb3Provider } from './WrappedWeb3Provider'
import { MetaProvider } from './MetaProvider'
import { StateProvider } from './StateProvider'
import { Header } from './Header'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <MetaProvider>
        <Router>
          <Header />
          <Container>
            <Switch>
              <Route exact path="/conf" component={ConfPage} />
              <WrappedWeb3Provider>
                <StateProvider>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/tx/:tx" component={TransactionPage} />
                </StateProvider>
              </WrappedWeb3Provider>
            </Switch>
          </Container>
        </Router>
      </MetaProvider>
    </div>
  )
}

export default App
