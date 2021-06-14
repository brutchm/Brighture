import React from 'react';
import {useFormik} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
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
        backgroundColor: '#fafafa',
      },
      input: {
        width: '80%',
        marginLeft: '10%',
        backgroundColor: '#FFF',
        marginBottom:'50px'
      },
      button: {
        width: '40%',
        marginLeft: '30%',
        backgroundColor: '#FFF',
        fontSize:'20px',
        padding:'10px'
      },
      root: {
        fontFamily: 'Nunito',
        backgroundColor:'#7C95A9',
        width:'100vw',
        height:'100vh'
      },
      title:{
        width:'100%',
        textAlign:'center',
        paddingTop:'50px',
        color:'#FFF',
        fontSize:'40px'
    },
}));

const validate = values =>{
    const errors = {};

    if(!values.correoElectronico){
        errors.correoElectronico='Campo requerido';
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correoElectronico)) {
        errors.correoElectronico = 'Correo electrónico inválido';
    }
    return errors;
}


export default function RecoverPassword(){

    const classes = useStyles();
    
    const getPassword = (mail)=>{
        axios.get('https://brightureapi.azurewebsites.net/api/Usuario/RecuperarContrasenna/'+mail.correoElectronico)
        .then((response)=>{
            alert("Su contraseña ha sido enviada al correo, si este se encuentra en nuesto sistema, intente iniciar sesión con esta");
            handleResponse(true);
        }).catch((error)=>{
            alert("Intentelo de nuevo, ocurrió un error");
            handleResponse(false);
        })
    }
    
    const formik = useFormik({
        initialValues:{
            correoElectronico:''
        },
        validate,
        onSubmit: values=>{
            getPassword(values);
        },
    });
    
    let history = useHistory();

    function handleResponse(status){
        
    
        if(status === true){
            history.push("/LogIn");
        }else{
            history.push("/");
        }
    }

    return(
        <div className={classes.root}>
             <h2 className={classes.title}>Recuperar Contraseña</h2>
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
                {formik.errors.correoElectronico ? <div>{formik.errors.correoElectronico}</div> : null}
                <div>
                <button className={classes.button} type="submit">Obtener Contraseña</button>
                </div>
                
            </form>
        </div>
    )
}