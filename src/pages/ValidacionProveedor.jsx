import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/HowToReg';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://portal.compraspublicas.gob.ec/sercop/">
      Servicio Nacional de Contratación Pública
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
//http://172.18.9.85:9091/api/sri/estadoTributario/{ruc}
function ValidacionProveedor() {
  const [ruc, setRuc] = useState('');//Iniciándolo estado
  const [dataruc, setDataRuc] = useState(null);//Iniciándolo estado
  const [cedula, setCedula] = useState('');//Iniciándolo estado
  const [datacedula, setDataCedula] = useState(null);//Iniciándolo estado
  const getValueRuc = e => {
    // const val = e.target.value;
    // if (e.target.validity.valid) this.setState({message: e.target.value});
    // else if (val === '' || val === '-') this.setState({message: val});
    console.log(e.target.value);
    setRuc(e.target.value);
  };
  const buscarRuc = e => {
    var credenciales = new FormData();
    credenciales.append('grant_type', 'password');
    credenciales.append('username', 'admin');
    credenciales.append('password', '12345');

    var config = {
        method: 'get',
        mode: 'no-cors',
        // url: `http://172.18.9.85:9091/api/sri/estadoTributario/${ruc}`,
        //http://172.18.9.85:9094/api/proveedor/consulta/0201506417001
        url: `http://172.18.9.85:9094/api/proveedor/consulta/${ruc}`,
        data : credenciales
    };
    axios(config)
    .then(function (response) {
        console.log(response.data);
        setDataRuc(response.data);
    })//.then (user => this.setState ( { usuario: JSON.stringify(user.data) } ))
    .catch(function (error) {
        console.log(error);
    });
  };
  const getValueCedula = e => {
    console.log(e.target.value);
    setCedula(e.target.value);
  };
  const buscarCedula = e => {
    var credenciales = new FormData();
    credenciales.append('grant_type', 'password');
    credenciales.append('username', 'admin');
    credenciales.append('password', '12345');

    var config = {
        method: 'get',
        mode: 'no-cors',
        url: `http://172.18.9.85:9092/api/dinardap/consulta/${cedula}`,
        data : credenciales
    };
    axios(config)
    .then(function (response) {
        console.log(response.data);
        setDataCedula(response.data);
    })//.then (user => this.setState ( { usuario: JSON.stringify(user.data) } ))
    .catch(function (error) {
        console.log(error);
    });
  };
  /////////////////************//////////////////
  const filterOnlyText = e => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue))
      e.preventDefault();
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Registro Único de Proveedores
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="fixed">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Valide la siguiente información:
            </Typography>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <form className={classes.form} autoComplete="off">
                      <div align='center'>
                        <TextField
                            type="number"
                            label="RUC"
                            id="rucproveedor"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                            onChange={ getValueRuc }
                            //onKeyDown = {e => [^\d].test(e.key) && e.preventDefault()}
                            //onKeyPress={ filterOnlyText }
                            //pattern="^-?[0-9]\d*\.?\d*$"
                            onInput = {(e) =>{
                              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,13)
                            }}
                        />
                      </div>
                      <div align='center'>
                          <Button onClick={ buscarRuc } variant="contained" color="primary" size="small">
                            Buscar
                          </Button>
                      </div>
                    </form>
                    {dataruc && (
                      <form className={classes.root} noValidate autoComplete="off">
                      <div align='center'>
                        <TextField
                            disabled
                            label="Nombres"
                            value={dataruc.nombre}
                            id="name"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            label="Actividad económica"
                            id="actividad"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            label="Dirección"
                            id="address"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            label="Fecha de registro"
                            id="logdate"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            label="Estado"
                            value={dataruc.descripcionEstadoTributario}
                            id="lastname"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                      </div>
                    </form>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </div>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                      <div align='center  '>
                        <TextField
                            type="number"
                            label="Cédula"
                            id="cedula1"
                            onChange={ getValueCedula }
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                            onInput = {(e) =>{
                              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                            }}
                        />
                      </div>
                      <div align='center  '>
                      <Grid container spacing={2} justify="center">
                      <Grid item>
                        <Button onClick={ buscarCedula } variant="contained" color="primary" size="small">
                          Buscar
                        </Button>
                      </Grid>
              </Grid>
                      </div>
                    {/* </form> */}
                    {datacedula && (
                        <form className={classes.root} noValidate autoComplete="off">
                        <div align='center'>
                          <TextField
                              disabled
                              label="Nombres"
                              //value={data ? data.nombre: ''}
                              value={datacedula.nombre}
                              id="name"
                              className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                          />
                          <TextField
                              disabled
                              label="Fecha de nacimiento"
                              id="actividad"
                              value={datacedula.fechanacimiento}
                              className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                          />
                          <TextField
                              disabled
                              label="Lugar de Nacimiento"
                              value={datacedula.lugarnacimiento}
                              id="address"
                              className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                          />
                          <TextField
                              disabled
                              label="Estado Civil"
                              value={datacedula.estadocivil}
                              id="logdate"
                              className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                          />
                          <TextField
                              disabled
                              label="Nombre Cónyugue"
                              id="lastname"
                              value={datacedula.conyuge}
                              className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                          />
                        </div>
                      </form>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </div>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Continuar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
//Estilos CSS
const useStyles = makeStyles((theme) => ({
  root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            // align: 'center'
        },
  },
  form: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        textsize: "10px", 
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
export default ValidacionProveedor;