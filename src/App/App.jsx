import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../themeConfig'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MainPage from '../pages/MainPage'
import Contact from '../pages/Contact'
import About from '../pages/About'
import AppFrame from '../components/AppFrame'

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
})

function App() {

  const classes = useStyles();
  return (

      <ThemeProvider theme={ theme }>
        <div className={classes.container}>
          <Router>
            <AppFrame />
            <Switch>
              <Route exact from="/" render={props => <MainPage {...props}/>} />
              <Route exact path="/contact" render={props => <Contact {...props}/>} />
              <Route exact path="/about" render={props => <About {...props}/>} />          
            </Switch>
        </Router>
        </div>
      </ThemeProvider>

  );
}

export default App;
