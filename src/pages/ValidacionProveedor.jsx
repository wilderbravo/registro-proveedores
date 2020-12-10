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
import PageLoading from '../components/PageLoading';

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
  const [ruc, setRuc] = useState('');//Iniciándo estado
  const [dataruc, setDataRuc] = useState(null);//Iniciándo estado
  const [cedula, setCedula] = useState('');//Iniciándo estado
  const [datacedula, setDataCedula] = useState(null);//Iniciándo estado
  const [proveedorEstado, setProveedorEstado] = useState(null);//Iniciándo estado
  const [buttonRucActivate, setbuttonRucActivate] = useState(true);//Iniciándo estado
  const [buttonCedulaActivate, setbuttonCedulaActivate] = useState(true);//Iniciándo estado
  const [loading, setLoading] = useState(false);//Iniciándo estado
  const getValueRuc = e => {
    setRuc(e.target.value);
  };
  ///////////*************Endpoints**************//////////////////
  /*      
          http://172.18.9.85:9094/api/proveedor/consulta/0201506417001
          http://172.18.9.85:9094/api/proveedor/consulta/0201506417001   
  */
  ///////////*************Endpoints**************//////////////////
  const buscarRuc = e => {
    var credenciales = new FormData();
    //Credenciales generales para las peticiones
    credenciales.append('grant_type', 'password');
    credenciales.append('username', 'admin');
    credenciales.append('password', '12345');
    //Sección para verificar el estado del proveedor
    var config = {
      method: 'get',
      mode: 'no-cors',
      url: `http://172.18.9.85:9091/api/sri/estadoTributario/${ruc}`,
      data : credenciales
    };
    axios(config)
    .then(function (response) {
        setProveedorEstado(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
    //Fin de petición de verificación de estado de proveedor
    //console.log(proveedorEstado.estadoTributario);
    let provee = proveedorEstado ? proveedorEstado.estadoTributario : 'N'
    if (provee==='S'){//Si el proveedor está al día en sus obligaciones se realiza la segunda consulta de sus datos
      console.log('Im inside');
      setbuttonRucActivate(false)
      console.log(buttonRucActivate)
      setLoading(true)
      //Sección para consultar los datos del proveedor
      var config = {
          method: 'get',
          mode: 'no-cors',
          url: `http://172.18.9.85:9095/api/soce/tgenRucContribuyentes/${ruc}`,
          data : credenciales
      };
      axios(config)
      .then(function (response) {
          console.log(response.data);
          setDataRuc(response.data);
          setLoading(false)
          setbuttonCedulaActivate(false)
      })//.then (user => this.setState ( { usuario: JSON.stringify(user.data) } ))
      .catch(function (error) {
          console.log(error);
          setLoading(false)
      });
    }
    else{
      console.log('Nothing to do');
    }
  };
  const getValueCedula = e => {
    console.log(e.target.value);
    setCedula(e.target.value);
  };
  const buscarCedula = e => {
    console.log('Llego aqui')
    var credenciales = new FormData();
    credenciales.append('grant_type', 'password');
    credenciales.append('username', 'admin');
    credenciales.append('password', '12345');
    setLoading(true)
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
        setLoading(false)
    })//.then (user => this.setState ( { usuario: JSON.stringify(user.data) } ))
    .catch(function (error) {
        console.log(error);
        setLoading(false)
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
      {
        loading && 
        <PageLoading className="text-center" />
      }
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="fixed">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Valide la siguiente información:
            </Typography>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>Datos proveedor 
                  </Paper>
                  </Grid>  
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    {/* <form className={classes.form} autoComplete="off"> */}
                      <div>
                        <TextField
                            type="number"
                            label="RUC"
                            id="rucproveedor"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                            onChange={ getValueRuc }
                            onInput = {(e) =>{
                              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,13)
                            }}
                        />
                        <Button className={classes.buttonPadding} onClick={ buscarRuc } variant="contained" color="primary" size="small">
                          Buscar
                        </Button>
                      </div>
                    {/* </form> */}
                    {/* {dataruc && ( */}
                      <form className={classes.root} noValidate autoComplete="off">
                      <div align='left'>
                        <TextField
                            disabled
                            label="Nombres"
                            //value={dataruc.nombre}
                            value={dataruc ? dataruc.razonSocial: ''}
                            id="name"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            label="Actividad económica"
                            value={dataruc ? (dataruc.fechaInicioActividades == '' ? '---': dataruc.fechaInicioActividades) : ''}
                            id="actividad"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            label="Dirección"
                            value={dataruc ? dataruc.calle + '-' + dataruc.numero + ' ' + dataruc.interseccion: ''}
                            id="address"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            label="Fecha de registro"
                            value={dataruc ? (dataruc.fechaInicioActividades == '' ? '---': dataruc.fechaInicioActividades) : ''}
                            id="logdate"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            label="Estado"
                            //value={dataruc.descripcionEstadoTributario}
                            value={proveedorEstado ? proveedorEstado.descripcionEstadoTributario: ''}
                            id="lastname"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        />
                      </div>
                    </form>
                    {/* )} */}
                  </Paper>
                </Grid>
              </Grid>
            </div>
            {/* Sección de datos de la persona */}
           
            <div className={classes.root}>
            <br /><br />
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>Datos persona
                  </Paper>
                </Grid>  
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                      <div>
                        <TextField
                            type="number"
                            label="Cédula"
                            disabled={buttonRucActivate}
                            id="cedula1"
                            onChange={ getValueCedula }
                            className={clsx(classes.margin, classes.textField)}
                            //InputClassName={classes.TheInput}
                            variant="outlined"
                            onInput = {(e) =>{
                              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                            }}
                        />
                        <Button disabled={buttonRucActivate} className={classes.buttonPadding} onClick={ buscarCedula } variant="contained" color="primary" size="small">
                          Buscar
                        </Button>
                      </div>
                    {/* </form> */}
                    {/* {datacedula && ( */}
                        <form className={classes.root} noValidate autoComplete="off">
                          <div align='left' >
                            <TextField
                                disabled
                                label="Nombres"
                                value={datacedula ? datacedula.nombre: ''}
                                id="name"
                                className={clsx(classes.margin, classes.textField)}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                label="Fecha de nacimiento"
                              // style={{ fontSize: 11 }}
                                id="actividad"
                                //value={datacedula.fechanacimiento}
                                value={datacedula ? datacedula.fechanacimiento: ''}
                                className={clsx(classes.margin, classes.textField)}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                label="Lugar de Nacimiento"
                              // style={{ fontSize: 20 }}
                                //value={datacedula.lugarnacimiento}
                                value={datacedula ? datacedula.lugarnacimiento: ''}
                                id="address"
                                className={clsx(classes.margin, classes.textField)}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                label="Estado Civil"
                                //style={{ fontSize: 7 }}
                                //value={datacedula.estadocivil}
                                value={datacedula ? datacedula.estadocivil: ''}
                                id="logdate"
                                className={clsx(classes.margin, classes.textField)}
                                variant="outlined"
                            />
                            <TextField
                                disabled
                                label="Nombre Cónyugue"
                                id="lastname"
                                //value={datacedula.conyuge}
                                value={datacedula ? datacedula.conyuge: ''}
                                className={clsx(classes.margin, classes.textField)}
                                variant="outlined"
                            />
                          </div>
                      </form>
                    {/* )} */}
                  </Paper>
                </Grid>
              </Grid>
            </div>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button disabled={buttonCedulaActivate} variant="contained" color="primary">
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
// const styles = theme => ({
//   buttonPadding: {    
//     padding: '50px', 
//     margin: '20px',  
//   },
// });

const useStyles = makeStyles((theme) => ({
  buttonPadding: {    
    margin: '9px',  
    marginTop: '20px',
  },
  TheInput: {
		fontSize: '3em',
		//lineHeight: 2.4
	},
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
        fontSize: "10px",   
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