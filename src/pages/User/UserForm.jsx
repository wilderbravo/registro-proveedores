import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Controls from "../../components/Controls";
import { useForm, Form } from '../../components/useForm';
import * as userService from "../../services/userService";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const initialFValues = {
    id: 0,
    nombreUsuario: '',
    email: '',
    celular: '',
    password: '',
    paswword1: ''
}

export default function UserForm() {

    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nombreUsuario' in fieldValues)
            temp.nombreUsuario = fieldValues.nombreUsuario ? "" : "Este campo es requerido."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email no válido."
        if ('celular' in fieldValues)
            temp.celular = fieldValues.celular.length > 9 ? "" : "Se requieren 10 números como mínimo."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const data = {
        "nombreCompleto": "Edgar Fabian Paredes Fierro",
        "cedula": "0201506417",
        "direccion": "Paredes",
        "celular": "Paredes",
        "correoElectronico": "geomy2111@gmail.com",
        "estado":"Activo",
        "tipoPersona": 8,
        "fechaRegistroPersona": "2020-01-01",
        "estadoRegistro": 14,
        "tipoProveedor": 5,
        "ruc":"0201890829001",
        "fechaRegistroProveedor":"2020-01-01"
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            userService.insertUser(values)
            resetForm()
        }
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registro Único de Proveedores
                        </Typography>
                    </div>
        <Form onSubmit={handleSubmit}>
            <Grid container>
            <Grid item xs={12}>
                  
                </Grid>
                <Grid item xs={12}>
                    <Controls.Input
                        name="nombreUsuario"
                        label="Nombre de usuario *"
                        value={values.nombreUsuario}
                        onChange={handleInputChange}
                        error={errors.nombreUsuario}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Input
                        label="Correo electrónico *"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Input
                        label="Número de celular *"
                        name="celular"
                        value={values.celular}
                        onChange={handleInputChange}
                        error={errors.celular}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Password
                        label="Contraseña *"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Password
                        label="Repetir Contraseña *"
                        name="password1"
                        value={values.password1}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                        <Controls.Button
                            type="submit"
                            text="Continuar" />
                </Grid>
            </Grid>
        </Form>
        </Container>
    )
}
