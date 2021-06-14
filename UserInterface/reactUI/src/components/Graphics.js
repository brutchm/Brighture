import Menu from './Menu';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useFormik } from 'formik';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { date } from 'date-fns/locale/af';

const useStyles = makeStyles((theme) => ({
  form: {
    // display: 'in-line-block',
    // width: '80vw',
    // marginLeft: '10vw', 
    width: '50%',   
    marginLeft: '25%',
    textAlign: 'center',    
    marginBottom: '30px'
  },
  root: {
    fontFamily: 'Nunito',
    backgroundColor: '#fafafa',
  },
  input: {
    width: '70%',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: '30px'
  },
  inputRadio: {
    width: '5%',
    marginTop: '20px',
  },
  button: {
    width: '250px',
    marginTop: '15px',
    height: '50px',
    marginBottom: '15px'
  },
}));


const validate = values => {
  const errors = {};
  if (!values.fecha) {
    errors.fecha = 'Required';
  }

  return errors;
};




export default function Graphics() {
  const [labelGrafico, setDataGrafico] = React.useState([]);
  const [valoresData, setValoresData] = React.useState([])

  const data = {
    labels: labelGrafico,
    datasets: [{
      label: 'Colones',
      backgroundColor: '#079D93',
      borderColor: '#07968D',
      borderWitch: 1,
      hoverBackgroundColor: '#08DED1',
      hoverBorderColor: '#09CFC3',
      data: valoresData
    }]
  }

  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }
  let idUser = sessionStorage.getItem('user')





  useEffect(() => {
    const hoy = new Date();

    let dia = hoy.getDate() <= 9 ? '0' + hoy.getDate() : hoy.getDate();
    let getMes = hoy.getMonth() + 1;
    let mes = getMes <= 9 ? '0' + getMes : getMes;
    let anno = hoy.getFullYear();
    let fechaHoy = dia.toString() + '-' + mes.toString() + '-' + anno.toString();

    axios({
      method: 'GET',
      url: 'https://brightureapi.azurewebsites.net/api/Ingreso_Egreso/' + window.sessionStorage.getItem("user") + '/' + fechaHoy,
    }).then((response) => {
      let arrLabel = [];
      let arrData = [];
      if (response.status === 200) {
        response.data.map((item) =>
          arrLabel.push(
            item.categoria
          )
        );

        response.data.map((item2) =>
          arrData.push(
            item2.valor
          )
        );

        setDataGrafico(arrLabel);
        setValoresData(arrData);

      } 
      
    }).catch((err) => {
      alert("No se encontraron ingresos para tal mes")
    });

  }, []);


  const getValoresGrafico = (transaccion) => {


    axios({
      method: 'get',
      url: 'https://brightureapi.azurewebsites.net/api/Ingreso_Egreso/' + transaccion.idUsuario + '/' + transaccion.fecha,
      data: {
      }
    }).then((response) => {
      let arrLabel = [];
      let arrData = [];
      if (response.status === 200) {
        response.data.map((item) =>
          arrLabel.push(
            item.categoria
          )
        );

        response.data.map((item2) =>
          arrData.push(
            item2.valor
          )
        );

        setDataGrafico(arrLabel);
        setValoresData(arrData);

      } else {

      }
    }).catch((err) => {
      
      alert("No se encontraron ingresos para tal mes")

    })


  }



  const formik = useFormik({
    initialValues: {
      fecha: '',
      idUsuario: idUser
    },
    validate,
    onSubmit: values => {
      getValoresGrafico(values);

    },
  });

  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const hoy = date;
    let dia = hoy.getDate() <= 9 ? '0' + hoy.getDate() : hoy.getDate();
    let getMes = hoy.getMonth() + 1;
    let mes = getMes <= 9 ? '0' + getMes : getMes;
    let anno = hoy.getFullYear();
    let fechaHoy = dia.toString() + '-' + mes.toString() + '-' + anno.toString();
    formik.values.fecha = fechaHoy;
  };

  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Menu />
      <h2 className={classes.title}>Gráficos de egresos</h2>
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate autoComplete="off">

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
          {formik.errors.fecha ? <div>{formik.errors.fecha}</div> : null}
        </MuiPickersUtilsProvider>

        <button className={classes.button} type="submit">Buscar</button>

      </form>
      <div style={{ width: '100%', height: '500px' }}>
        <h3 className={classes.title}>Egresos mensuales por categorías</h3>
        <Bar data={data} options={opciones} />
      </div>
    </div>
  );
}