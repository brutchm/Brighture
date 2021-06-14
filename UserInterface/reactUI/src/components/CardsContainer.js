import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormCards from './FormCards';
import ListCards from './ListCards';
import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
   
    root: {
      fontFamily: 'Nunito',
      backgroundColor: '#fafafa',
    },
    container:{
        display: 'block',
        width: '100vw'
      
    },
    input: {
      width: '25vw',
      margin: '2rem',
      backgroundColor: '#e8f1f5',
    },
    button: {
      width: '15vw',
      margin: '2rem',
      backgroundColor: '#e8f1f5',
    },
    formulaio:{
      
    },
    tabla:{
        
        
    }

  }));

export default function CardsContainer() {

    const classes = useStyles();
  
  
    return (
      <div className={classes.container} >
        <Menu/>
        <h2>Administración de tarjetas</h2>
        <div>
            <div className={classes.formulaio}>
                <FormCards></FormCards>
            </div>

            <div className= {classes.tabla}>
                <ListCards></ListCards>
            </div>
        </div>
       
      </div>
    );
  };