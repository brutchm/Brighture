import React from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'in-line-block',
    width: '60%',
    marginLeft: '20%',
    backgroundColor:'#FFF'
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
    marginTop:'40px'
  },
  button: {
    width: '20%',
    marginLeft: '40%',
    backgroundColor: '#FFF',
    marginTop:'75px',
    marginBottom:'75px',
    padding:'10px',
    fontSize:'20px'
  },
  title:{
    width:'100%',
    textAlign:'center',
    fontSize:'40px',
    paddingTop:'50px',
    color:'#FFF'
  }
}));

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {};
  if (!values.id) {
    errors.id = 'Required';
  }

  if (!values.nombre) {
    errors.nombre = 'Required';
  }

  if (!values.apellidoUno) {
    errors.apellidoUno = 'Required';
  }

  if (!values.apellidoDos) {
    errors.apellidoDos = 'Required';
  }

  if (!values.fechaNacimiento) {
    errors.fechaNacimiento = 'Required';
  }

  if (!values.correoElectronico) {
    errors.correoElectronico = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correoElectronico)) {
    errors.correoElectronico = 'Correo electrónico inválido';
  }

  if (!values.contrasenna) {
    errors.contrasenna = 'Required';
  } else if (values.contrasenna.length < 8) {
    errors.contrasenna = 'La contraseña debe ser de al menos 8 caracteres';
  }

  if (!values.confirmacionContrasenna) {
    errors.confirmacionContrasenna = 'Required';
  } else if (values.contrasenna !== values.confirmacionContrasenna) {
    errors.confirmacionContrasenna = 'La contraseña y confirmación de contraseña deben ser iguales';
  }
  return errors;
};

const postUsuario = (user) => {
  axios({
    method: 'post',
    url: 'https://brightureapi.azurewebsites.net/api/Usuario',
    data: {
      'id': user.id,
      'nombre': user.nombre,
      'apellidoUno': user.apellidoUno,
      'apellidoDos': user.apellidoDos,
      'fechaNacimiento': user.fechaNacimiento,
      'correoElectronico': user.correoElectronico,
      'contrasenna': user.contrasenna
    }
  }).then((res) => {
    alert("Por favor proceda a iniciar sesión");
    window.location.href="/LogIn"
  }).catch((err) => {
    alert("Error del catch:" + err);
  })
}

export default function Register() {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      id: '',
      nombre: '',
      apellidoUno: '',
      apellidoDos: '',
      fechaNacimiento: '',
      correoElectronico: '',
      contrasenna: '',
      confirmacionContrasenna: ''
    },
    validate,
    onSubmit: values => {
      postUsuario(values);
    },
  });

  const [selectedDate, setSelectedDate] = React.useState();
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    formik.values.fechaNacimiento = `${day}/${month}/${year}`;
  };

  const classes = useStyles();


  return (
    <div className={classes.root} >
      <h2 className={classes.title}>Registro de usuario</h2>
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate autoComplete="off">

        <TextField
          required
          id="id"
          name="id"
          type="text"
          label="Identificación"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.id}
          className={classes.input}
        />
        {formik.errors.id ? <div>{formik.errors.id}</div> : null}


        <TextField
          required
          id="nombre"
          name="nombre"
          type="text"
          label="Nombre"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nombre}
          className={classes.input}
        />
        {formik.errors.nombre ? <div>{formik.errors.nombre}</div> : null}


        <TextField
          required
          id="apellidoUno"
          name="apellidoUno"
          type="text"
          label="Primer apellido"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.apellidoUno}
          className={classes.input}
        />
        {formik.errors.apellidoUno ? <div>{formik.errors.apellidoUno}</div> : null}


        <TextField
          required
          id="apellidoDos"
          name="apellidoDos"
          type="text"
          label="Segundo apellido"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.apellidoDos}
          className={classes.input}
        />
        {formik.errors.apellidoDos ? <div>{formik.errors.apellidoDos}</div> : null}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            required
            margin="normal"
            id="fechaNacimiento"
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            className={classes.input}
          />
          {formik.errors.fechaNacimiento ? <div>{formik.errors.fechaNacimiento}</div> : null}
        </MuiPickersUtilsProvider>



        <TextField
          required
          id="correoElectronico"
          name="correoElectronico"
          type="email"
          label="Correo electrónico"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={classes.input}
        />
        {formik.errors.correoElectronico ? <div>{formik.errors.correoElectronico}</div> : null}


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
        {formik.errors.contrasenna ? <div>{formik.errors.contrasenna}</div> : null}


        <TextField
          required
          id="confirmacionContrasenna"
          name="confirmacionContrasenna"
          type="password"
          label="Confirmación de contraseña"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmacionContrasenna}
          className={classes.input}
        />
        {formik.errors.confirmacionContrasenna ? <div>{formik.errors.confirmacionContrasenna}</div> : null}

        <button className={classes.button} type="submit">Registrarme</button>
      </form>
    </div>
  );
};