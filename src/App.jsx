import React, { Fragment } from 'react'
import Header from './components/Header'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './themeConfig'

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <ThemeProvider theme={ theme }>
        <Header/>

        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component=""/>
            <Route exact path="/clientes/nuevo" component=""/>
            <Route exact path="/clientes/editar" component=""/>
          </Switch>
        </div>
        
      </ThemeProvider>
    </Router>
  );
}

export default App;
