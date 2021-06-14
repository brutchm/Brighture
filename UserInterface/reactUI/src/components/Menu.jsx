import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import  {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
      width:'100%',
    flexGrow: 1,
    fontFamily: 'Nunito',
  },
  navBarButton: {
    marginRight: theme.spacing(2),
    paddingLeft: '10px',
    color:'#FFF'
  },
  title: {
    fontFamily: 'Nunito',
    flexGrow: 1,
  },
  logo:{
      width:'5%',
  },
  appBar:{
      backgroundColor:'#005691'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  let history= useHistory();

    function cerrarSesion(){
        sessionStorage.clear();
    }

    if(sessionStorage.getItem('user')===null){
        history.push("/");
    }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>Brighture</Typography>
          <Link to={'/Home'}>
            <Button className={classes.navBarButton} color="inherit">Inicio</Button>
          </Link>
            
            <Link to={'/Operations'}>
              <Button className={classes.navBarButton} color="inherit">Registrar Operación</Button>
            </Link>
            <Link to={'/Cards'}>
              <Button className={classes.navBarButton} color="inherit">Tarjetas</Button>
            </Link>
            <Link to="/Graphics">
                <Button className={classes.navBarButton} color="inherit">Gráficos</Button>
            </Link>
            <Link to="/">
                <Button onClick={cerrarSesion} className={classes.navBarButton} color="inherit">Salir</Button>
            </Link>

            
        </Toolbar>
      </AppBar>
    </div>
  );
}
