import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';

import { useParams } from 'react-router-dom';

//modal
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
    form: {
        // display: 'in-line-block',
        // width: '80vw',
        // marginLeft: '10vw',
        paddingTop:'50px',
        width:'60%',
        marginTop:'50px',
        marginLeft:'20%',
        textAlign:'center',
        backgroundColor:'#e8f1f5',
        marginBottom:'100px'
      },
      root: {
        fontFamily: 'Nunito',
        backgroundColor: '#fafafa',
      },
      input: {
        width:'70%',
        marginTop:'50px',
       
      },
      title:{
        width:'100%',
        textAlign: 'center',
        fontSize:'30px'
    },
      inputRadio: {
        width:'5%',
        marginTop:'20px',    
      },
      button: {
        width: '250px',
        marginTop:'100px',
        height: '50px',
        marginBottom:'100px'
      },
}));

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
    const errors = {};
    if (!values.id) {
        errors.id = 'Required';
    }

    if (!values.tipo) {
        errors.tipo = 'Required';
    }

    if (!values.entidadBancaria) {
        errors.entidadBancaria = 'Required';
    }

    if (!values.fechaCorte) {
        errors.fechaCorte = 'Required';
    }

    return errors;
};

const putTarjeta = (tarjeta) => {
    
    axios({
        method: 'put',
        url: 'https://brightureapi.azurewebsites.net/api/Tarjeta',
        data: {
            'id': tarjeta.id,
            'tipo': tarjeta.tipo,
            'entidadBancaria': tarjeta.entidadBancaria,
            'fechaCorte': tarjeta.fechaCorte,
            'idUsuario': tarjeta.idUsuario
        }
    }).then((res) => {
      
      
    }).catch((err) => {
        
    })
}



export default function FormCards() {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    let idUser = sessionStorage.getItem('user');

    const [initialVal, setInitialValues] = useState({ id: 0, tipo: '', entidadBancaria: '', fechaCorte: '', idUsuario: '' });

    let { id } = useParams();

    async function getInitialValues(callback) {
        try {
            axios({
                method: 'GET',
                url: 'https://brightureapi.azurewebsites.net/api/Tarjeta/' + id,
            }).then((response) => {
                let hoy = response.data.fechaCorte;
                let dia = new Date();
                dia.setDate(parseInt(hoy, 10));
                setSelectedDate(dia);
                setInitialValues(response.data);
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getInitialValues();
    }, []);

    const formik = useFormik({
        initialValues: {            
            id: initialVal.id,
            tipo: initialVal.tipo,
            fechaCorte: initialVal.fechaCorte,
            entidadBancaria: initialVal.entidadBancaria,
            idUsuario: initialVal.idUsuario           
        },
        validate,
        onSubmit: values => {
            
            putTarjeta(values);
            handleClickOpen();
        },
        enableReinitialize: true
    });

    const [selectedDate, setSelectedDate] = React.useState();

    const handleDateChange = (date) => {                     
        setSelectedDate(date);
        let day = date.getDate(); 
        formik.values.fechaCorte = day.toString(); 

    }

    const classes = useStyles();  


    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (id, e) => {
        setOpen(true);    
    };

    let history = useHistory();
    const handleClose = () => {
        setOpen(false);
        history.push("/Cards"); 
    };
    
    return (
        <div className={classes.root} >
        <Menu/>
            <h2 className={classes.title}>Modificación de tarjeta</h2>
           

            <form onSubmit={formik.handleSubmit} className={classes.form} noValidate autoComplete="off">

                <TextField
                    required
                    id="id"
                    name="id"
                    type="text"
                    label="Número de tarjeta"
                    disabled
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.id}
                    className={classes.input}
                />
                {formik.errors.id ? <div>{formik.errors.id}</div> : null}
                <h2>Tipo de tarjeta</h2>
                <div >
                    <input
                        id="credito"
                        type="radio"
                        value="crédito"
                        name='tipo'
                        onChange={formik.handleChange}
                        defaultChecked={formik.values.tipo === "crédito"}
                        className={classes.inputRadio}
                        checked={formik.values.tipo === "crédito"}
                    />
                    <label
                        className="custom-control-label"
                        htmlFor="credito"
                    >
                        Crédito
                   </label>

                   <input
                        id="debito"
                        type="radio"
                        value="débito"
                        name='tipo'
                        onChange={formik.handleChange}
                        className={classes.inputRadio}
                        defaultChecked={formik.values.tipo === "débito"}
                        checked={formik.values.tipo === "débito"}
                    />
                    <label
                        className="custom-control-label"
                        htmlFor="debito"
                    >
                        Débito
                 </label>
                </div>
          

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        required
                        margin="normal"
                        id="fechaCorte"
                        label="Fecha de corte"
                        name="fechaCorte"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        className={classes.input}
                    />
                    {formik.errors.fechaCorte ? <div>{formik.errors.fechaCorte}</div> : null}
                </MuiPickersUtilsProvider>

                <TextField
                    required
                    id="entidadBancaria"
                    name="entidadBancaria"
                    type="text"
                    label="Entidad bancaria"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.entidadBancaria}
                    className={classes.input}
                />
                {formik.errors.entidadBancaria ? <div>{formik.errors.entidadBancaria}</div> : null}
                        <div>
                <button className={classes.button} type="submit">Modificar</button>
              </div>

            </form>

            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Modificar tarjeta"}</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Su tarjeta ha sido modificada correctamente
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Aceptar
            </Button>        
            </DialogActions>
            </Dialog>

        </div>
    );
};