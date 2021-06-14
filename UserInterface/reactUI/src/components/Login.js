import React from 'react';
import {useFormik} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    form: {
      display: 'in-line-block',
      width:'40%',
      marginLeft:'27.5%',
      alignContent:'center',
      marginTop:'100px',
      backgroundColor:'#FFF',
      padding:'50px'
    },
    root: {
      fontFamily: 'Nunito',
      backgroundColor:'#7C95A9',
      width:'100vw',
      height:'100vh'
    },
    input: {
      width: '80%',
      marginLeft: '10%',
      backgroundColor: '#FFF',
      marginBottom:'50px'
    },
    button: {
      width: '40%',
      marginLeft: '10%',
      backgroundColor: '#FFF',
      fontSize:'20px',
      padding:'10px'
    },
    title:{
        width:'100%',
        textAlign:'center',
        paddingTop:'50px',
        color:'#FFF',
        fontSize:'40px'
    },
    buttons:{
        width:'80%',
        marginLeft:'10%'
    }
  }));

const validate = values=>{
    const errors = {};

    if(!values.correoElectronico){
        errors.correoElectronico='Campo requerido';
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correoElectronico)) {
        errors.correoElectronico = 'Correo electrónico inválido';
      }

    if (!values.contrasenna) {
        errors.contrasenna= 'Campo requerido';
    }

    return errors;
}



export default function Login(){
    let history = useHistory();

    function handleClick(stat) {
        if(stat === true){
            history.push("/Home");
        }else{
            history.push("/LogIn");
        }
        
    }

    const logIn = (user) => {
        axios.get('https://brightureapi.azurewebsites.net/api/Usuario/LogIn/'
                +user.correoElectronico+"/"+user.contrasenna
            ).then((response) =>{
                sessionStorage.setItem('user', JSON.stringify(response.data.id));
                handleClick(true);
            }).catch((err) =>{
                alert("Intentelo de nuevo, ocurrió un error");
                handleClick(false);
            })
    }

    const formik = useFormik({
        initialValues:{
            correoElectronico:'',
            contrasenna:''
        },
        validate,
        onSubmit: values => {            
            logIn(values);
        },
    });

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <h2 className={classes.title}>Iniciar Sesión</h2>
            <form onSubmit={formik.handleSubmit} className={classes.form} noValidate autoComplete="off">
                <TextField
                    required
                    id="correoElectronico"
                    name="correoElectronico"
                    type="email"
                    label="Correo Electronico"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.correoElectronico}
                    className={classes.input}
                />
                
                <TextField
                    required
                    id="contrasenna"
                    name="contrasenna"
                    type="password"
                    label="Contraseña"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contrasenna}
                    className={classes.input}
                />

                <div className={classes.buttons}>
                <button className={classes.button} type="submit">Iniciar Sesión</button>
                <button className={classes.button} type="button" onClick={event=>window.location.href='/RecoverPassword'}>Recuperar contraseña</button>
                </div>
                
            </form>
        </div>
    );
};