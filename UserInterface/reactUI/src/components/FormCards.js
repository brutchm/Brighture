import React from 'react';
import { useFormik} from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
import Menu from './Menu';

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
    width: '20%',
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

const postTarjeta = (tarjeta) => {
  axios({
    method: 'post',
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
  let idUser = sessionStorage.getItem('user')

  const formik = useFormik({
    initialValues: {
      id: '',
      tipo: '',
      entidadBancaria: '',
      fechaCorte: '',
      idUsuario: idUser
    },
    validate,
    onSubmit: values => {
      postTarjeta(values);
      handleClickOpen();
    },
  });

  const [selectedDate, setSelectedDate] = React.useState();
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    let day = date.getDate();  
    formik.values.fechaCorte = day.toString();
  };

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
      <h2 className={classes.title}>Registro de tarjeta</h2>
      
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate autoComplete="off">

        <TextField
          required
          id="id"
          name="id"
          type="text"
          label="N??mero de tarjeta"
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
                    value="cr??dito"
                    name='tipo'
                    className={classes.inputRadio}
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.tipo=== "cr??dito"}
                  />
                  <label
                     className="custom-control-label"
                     htmlFor="credito"
                   >
                     Cr??dito
                   </label>
                   <input
                    id="debito"
                    type="radio"
                    value="d??bito"
                    name='tipo'
                    className={classes.inputRadio}
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.tipo=== "d??bito"}
                  />
                 <label
                   className="custom-control-label"
                   htmlFor="debito"
                  >
                    D??bito
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
          value={formik.values.nombre}
          className={classes.input}
        />
        {formik.errors.entidadBancaria ? <div>{formik.errors.entidadBancaria}</div> : null}
            <div>
            <button className={classes.button} type="submit">Registrar</button>
            </div>
        

      </form>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Registrar tarjeta"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Su tarjeta ha sido registrada correctamente
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