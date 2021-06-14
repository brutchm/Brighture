import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import ImageCard from './ImageCard';
import places from '../static/places';
import  {Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {

    height: '250vh',
    fontFamily: 'Nunito',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/Wallpaper2.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  header:{
    display: 'flex',
    justifyContent: 'center',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  container: {
    textAlign: 'center',
    marginTop:'40vh',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#FFF',
    fontSize: '4rem',
  },
  rootInfo: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'50vh',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  iconos:{
    color:'#FFF',
  },
  iconContainer:{
    marginTop:'5vh',
    display:'flex',
    justifyContent:'center',
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
        <div className={classes.root}>
          <div className={classes.header} id="header">
            <AppBar className={classes.appbar} elevation={0}>
              <Toolbar className={classes.appbarWrapper}>
                <h1 className={classes.appbarTitle}>
                  Brighture
                </h1>
              </Toolbar>
            </AppBar>

            <Collapse
              in={checked}
              {...(checked ? { timeout: 1000 } : {})}
              collapsedHeight={50}
            >
              <div className={classes.container}>
                <h1 className={classes.title}>
                  Bienvenidos a <br />Brighture
                </h1>
                <Scroll to="information" smooth={true}>
                  <IconButton>
                    <ExpandMoreIcon className={classes.goDown} />
                  </IconButton>
                </Scroll>
              </div>
              <div className={classes.iconContainer}>
                <Link to='/Register'>
                  <IconButton className={classes.iconos}>
                    <ExitToAppIcon className={classes.icon} /> Registrarse
                  </IconButton>
                </Link>
                <Link to='/LogIn'>
                  <IconButton className={classes.iconos}>
                    <AccountCircleOutlinedIcon className={classes.icon} /> Iniciar Sesión
                  </IconButton>
                </Link>
              </div>
            </Collapse>
          </div>
          <div className={classes.rootInfo} id="information">
            <ImageCard place={places[0]} checked={checked} />
            <ImageCard place={places[1]} checked={checked} />
          </div>
        </div>
  );
}
