import React from 'react';
import {useFormik} from 'formik';
import {makeStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Menu from './Menu';


const usingStyles = makeStyles((theme)=>({
    formControl:{
        width:'200px',
    },
    root:{
        fontFamily: 'Nunito',
    },
    title:{
        width:'100%',
        textAlign: 'center',
        fontSize:'30px'
    },
    form:{
        paddingTop:'50px',
        width:'60%',
        marginTop:'50px',
        marginLeft:'20%',
        textAlign:'center',
        backgroundColor:'#e8f1f5',
        marginBottom:'100px'
    },
    input:{
        width:'60%',
        marginTop:'50px'
    },
    button:{
        width: '250px',
        marginTop:'100px',
        height: '50px',
        marginBottom:'100px'
    }
}));

const validate = values =>{
    const errors={};

    if(!values.tipo){
        errors.tipo='Required';
    }
    if (!values.valor) {
        errors.valor = 'Required';
    }
    if(!values.categoria){
        errors.categoria='Required';
    }
    if (!values.fecha) {
        errors.fecha = 'Required';
    }
    if(!values.metodoPago){
        errors.metodoPago='Required';
    }

    return errors;
}



export default function RegisterTransaction(){
    let idUser = sessionStorage.getItem('user')

    const formik = useFormik({
        initialValues:{
            tipo:'',
            valor:'',
            categoria:'',
            fecha:'',
            metodoPago:'',
            tarjeta:'',
            idUsuario:idUser
        },
        validate,
        onSubmit: values=>{
            postTransaccion(values);
        },

    })

    const postTransaccion =(transaccion)=>{
        axios({
            method:'post',
            url: 'https://brightureapi.azurewebsites.net/api/Ingreso_Egreso',
            data:{
                'tipo':transaccion.tipo,
                'valor':transaccion.valor,
                'categoria': transaccion.categoria,
                'fecha': transaccion.fecha,
                'metodoPago':transaccion.metodoPago,
                'tarjeta': transaccion.tarjeta,
                'idUsuario': transaccion.idUsuario
            }
        }).then((res)=>{
            handleClick(true)
        }).catch((err)=>{
            handleClick(false)
            alert("Ha ocurrido un error, por favor intentelo m??s tarde");
        })
    }
    
    let history = useHistory();
    
    function handleClick(stat) {
        if(stat === true){
            history.push("/Home");
        }else{
            history.push("/Home");
        }
        
    }

    const [selectedDate, setSelectedDate] = React.useState();

    const handleDateChange = (date) =>{
        setSelectedDate(date);
        formik.values.fecha = date.toString();
    };

    const classes = usingStyles();
    const [categoria, setCategoria] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setCategoria(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return(
        <div className={classes.root}>
            <Menu/>
            <h2 className={classes.title}>Registro de Transacciones</h2>
            
            <form onSubmit={formik.handleSubmit} className={classes.form} noValidate autoComplete="off">
                <div >
                    <h2>Tipo de transacci??n</h2>
                    <input
                        id="Ingreso"
                        type="radio"
                        value="Ingreso"
                        name='tipo'
                        onChange={formik.handleChange}
                        defaultChecked={formik.values.tipo=== "Ingreso"}
                    />
                    <label className="custom-control-label" htmlFor="Ingreso">
                        Ingreso
                    </label>
                    <input
                        id="Egreso"
                        type="radio"
                        value="Egreso"
                        name='tipo'
                        onChange={formik.handleChange}
                        defaultChecked={formik.values.tipo=== "Egreso"}
                    />
                    <label className="custom-control-label" htmlFor="Egreso">
                        Egreso
                    </label>
                </div>
                <TextField
                    className={classes.input}
                    id="valor"
                    label="Valor"
                    name="valor"
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.valor}
                />
                <FormControl className={classes.formControl} className={classes.input}>
                    <InputLabel id="categoria">Categor??a</InputLabel>
                    <Select
                        className={classes.select}
                        labelId="categoria"
                        id="dcategoria"
                        name="categoria"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={categoria}
                        onChange={handleChange, formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoria}
                        
                    >
                    <MenuItem value={"Alimento"}>Alimento</MenuItem>
                    <MenuItem value={"Recreaci??n"}>Recreaci??n</MenuItem>
                    <MenuItem value={"Combustible"}>Combustible</MenuItem>
                    <MenuItem value={"Transporte"}>Transporte</MenuItem>
                    <MenuItem value={"Hogar"}>Hogar</MenuItem>
                    <MenuItem value={"Impuestos"}>Impuestos</MenuItem>
                    <MenuItem value={"Educaci??n"}>Educaci??n</MenuItem>
                    <MenuItem value={"Servicios P??blicos"}>Servicios P??blicos</MenuItem>
                    <MenuItem value={"Ahorro"}>Ahorro</MenuItem>
                    <MenuItem value={"Vestimenta"}>Vestimenta</MenuItem>
                    <MenuItem value={"Otros"}>Otros</MenuItem>
                    </Select>
                </FormControl>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className={classes.input}
                        required
                        margin="normal"
                        id="fecha"
                        label="Fecha"
                        name="fecha"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                        'aria-label': 'change date',
                        }}
                        className={classes.input}
                    />
                </MuiPickersUtilsProvider>
                
                <div>
                    <h2>M??todo de Pago</h2>
                        <input
                            id="Efectivo"
                            type="radio"
                            value="Efectivo"
                            name='metodoPago'
                            onChange={formik.handleChange}
                            defaultChecked={formik.values.metodoPago=== "Efectivo"}
                        />
                        <label className="custom-control-label" htmlFor="Efectivo">
                            Efectivo
                        </label>
                        <input
                            id="Tarjeta"
                            type="radio"
                            value="Tarjeta"
                            name='metodoPago'
                            onChange={formik.handleChange}
                            defaultChecked={formik.values.metodoPago=== "Tarjeta"}
                        />
                        <label className="custom-control-label" htmlFor="Tarjeta">
                            Tarjeta
                        </label>
                </div>
                
                    <button className={classes.button} type="submit">Registrar</button>
            </form>
        </div>
    )
}