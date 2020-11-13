import React from 'react'
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import theme from '../themeConfig'
import Users from '../pages/User/UserForm.jsx'


const useStyles = makeStyles({
  container: {
    display: "flex"
  }
})

function App() {

  const classes = useStyles();
  return (

      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <div className={classes.container}>
          <Users />
          {/* <Router>
            <AppFrame />
            <Switch>
              <Route exact from="/" render={props => <MainPage {...props}/>} />
              <Route exact path="/contact" render={props => <Contact {...props}/>} />
              <Route exact path="/about" render={props => <About {...props}/>} />          
            </Switch>
        </Router> */}
        </div>
      </ThemeProvider>

  );
}

export default App;
