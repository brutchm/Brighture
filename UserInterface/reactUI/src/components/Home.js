import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from './Menu';
import ListTransactions from './ListTransactions';

const useStyles = makeStyles((theme)=>({

}));

export default function Home(){
    const classes = useStyles();
    let user = sessionStorage.getItem('user');

    return(
        <div className={classes.root}>
            <Menu/>
            <ListTransactions></ListTransactions>
        </div>
    )
};