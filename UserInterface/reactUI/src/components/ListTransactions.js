import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useHistory } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundColor:'#e8f1f5',
        marginBottom:'50px'
      },
      title: {
        fontSize: 14,
        fontFamily: 'Nunito',
      },
      pos: {
        marginBottom: 12,
        fontFamily: 'Nunito',
      },
      cardBox:{
          width: '80%',
          marginLeft:'10%',
          fontFamily: 'Nunito',
      },
      actionTitle:{
          width:'100%',
          textAlign:'center',
          fontFamily: 'Nunito',
      },
      rootDiv:{
        fontFamily: 'Nunito',
      }
});

export default function ListTransactions(){
    const classes = useStyles();
    const [transacciones, setTransacciones]= React.useState([{id:'',tipo:'', valor:'', categoria:'',fecha:'', metodoPago:'', tarjeta:'', idUsuario:''}]);

    useEffect(()=>{
        axios({
            method:'GET',
            url: 'https://brightureapi.azurewebsites.net/api/Ingreso_Egreso/ByUserId/'+window.sessionStorage.getItem("user"),
        }).then((response)=>{
        let arr = [];
        if(response.status === 200){
            response.data.map((item) => 
            arr.push({
                id : item.id,
                tipo: item.tipo,
                valor: item.valor,
                categoria: item.categoria,
                fecha:item.fecha,
                metodoPago: item.metodoPago,
                idUsuario:item.idUsuario
            }));
            setTransacciones(arr);
       }else{
            alert("No tiene operaciones registradas");
       }
        }).catch((err)=>{
            alert(err)
        });
    },[]);

    let history = useHistory();

    function updateInfo(id, e) {
        e.preventDefault();    
        history.push("/updOperacion/"+id);    
      }

    function deleteRow(e) {
        e.preventDefault();    
        axios({
          method : 'DELETE',
          url: 'https://brightureapi.azurewebsites.net/api/Ingreso_Egreso/'+idOperacion,
      }).then((response) =>{    
          alert(response)
      }).catch((err) =>{
          alert(err)
      });
        handleClose();
      }

const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
      const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id, e) => {
        setOpen(true);
        setIdOperacion(id);
      };
    
      const handleClose = () => {
        setOpen(false);
    };

    const[idOperacion, setIdOperacion]= React.useState(0);
    return (
        <div className={classes.rootDiv}>
            <h1 className={classes.actionTitle}>Mis Transacciones</h1>
            <div className={classes.cardBox}>
            {transacciones.map((info)=>(
                <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {info.tipo}
                    </Typography>
                    <Typography variant="h5" component="h2">
                    {'Valor: ₡'}
                    {info.valor}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    {'Categoría: '}
                    {info.categoria}
                    </Typography>
                    <Typography variant="body2" component="p">
                    {'Fecha: '}
                    {info.fecha}
                    <br />
                    <br />
                    {'Método de pago: '}
                    {info.metodoPago}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={(e)=> updateInfo(info.id, e)}>Modificar</Button>
                    <Button size="small" onClick={(e) => handleClickOpen(info.id, e)}>Eliminar</Button>
                </CardActions>
            </Card>
            ))}
            </div>
            <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Eliminar tarjeta"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Desea eliminar la  operación seleccionada?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={(e)=>deleteRow(e)} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
            
            
        </div>
    )
}