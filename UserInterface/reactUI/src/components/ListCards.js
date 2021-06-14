import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import  {Link} from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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


const useStyles = makeStyles({
  table: {
    width:'90%',
    marginLeft:'5%',
    backgroundColor:'#e8f1f5',
    textAlign: 'center',
    marginBottom:'100px',
    fontSize:'20px'
  },
  deleteIcon:{
    color: '#EA4335'
  },
  editIcon:{
    color: '#FBBC05'
  },
  addIcon:{
    color: '#34A853'
  },
  title:{
    width:'100%',
    textAlign: 'center',
    fontSize:'30px'
  },
  divContainer:{
    width: '80px'
  },
  root:{
    fontFamily:'Nunito'
  },
  iconos:{
    margin:'1%'
  }
  
});




export default function ListCards() {
  const classes = useStyles();
  const [rows, setRows] = React.useState([{id:'', tipo:'', fechaCorte: '', entidadBancaria:''}]);
  
  useEffect( () =>{
    axios({
        method : 'GET',
        url: 'https://brightureapi.azurewebsites.net/api/Tarjeta/CardsByUserId/'+window.sessionStorage.getItem("user"),
    }).then((response) =>{
       let arr = [];
       if(response.status === 200){
            response.data.map((item) => 
            arr.push({
                id : item.id,
                tipo: item.tipo,
                fechaCorte: item.fechaCorte,
                entidadBancaria: item.entidadBancaria
            }));
            setRows(arr);
       }else{
            
       }

    }).catch((err) =>{
        
    });

  }, []);

  let history = useHistory();
  function deleteRow(e) {
    e.preventDefault();    
    axios({
      method : 'DELETE',
      url: 'https://brightureapi.azurewebsites.net/api/Tarjeta/'+idTarj,
  }).then((response) =>{          
      window.location.reload();
  }).catch((err) =>{      
  });
    handleClose();        
  }


  function updateRow(id, e) {
    e.preventDefault();    
   
    history.push("/CardsUpd/"+id);    
  }


  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = (id, e) => {
    setOpen(true);
    setIdTarj(id);
  };

  const handleClose = () => {
    setOpen(false);    
  };

  const [idTarj, setIdTarj] = React.useState(0);

  return ( 
    <div  className={classes.root}>
      <Menu/>
     <h2 className={classes.title}>Mis tarjetas</h2>
     <div>
      <Link to='/FormCards'>
                  <IconButton className={classes.iconos}>
                    <AddCircleIcon className={classes.addIcon} />Crear tarjeta
                  </IconButton>
                </Link>
      </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">

        <TableHead>
          <TableRow>
            <TableCell>Número de tarjeta</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Fecha de corte</TableCell>
            <TableCell align="right">Banco</TableCell>      
            <TableCell align="right">Modificar</TableCell>    
            <TableCell align="right">eliminar</TableCell>       
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.tipo}</TableCell>
              <TableCell align="right">{row.fechaCorte}</TableCell>
              <TableCell align="right">{row.entidadBancaria}</TableCell>                  
              <TableCell align="right">              
              <IconButton onClick={(e) => updateRow(row.id,e)}>
                    <EditIcon className={classes.editIcon}/>
              </IconButton>
              </TableCell>           
              <TableCell align="right">
                  <IconButton onClick={(e) => handleClickOpen(row.id, e)}>
                    <DeleteIcon className={classes.deleteIcon}/>
                  </IconButton>
              </TableCell>   
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Eliminar tarjeta"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Desea eliminar la  tarjeta seleccionada?
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
    </TableContainer>

   
    </div>
  );
}