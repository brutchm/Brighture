import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Cards from './components/Cards';

import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import ListCards from './components/ListCards';
import Home from './components/Home';
import UpdateTransaction from './components/UpdateTransaction';
import UpdateFormCards from './components/UpdateFormCards';
import FormCards from './components/FormCards';
import RecoverPassword from './components/RecoverPassword';
import Operation from './components/RegisterTransaction';
import Graphics from './components/Graphics';



function App() {
  return (
    <Router>
      <div className="app">

        <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/Register" exact  component={Register}/>
          <Route path="/LogIn" exact component={Login}/>          
          <Route path="/Cards" exact component={ListCards}/>
          <Route path="/Home" exact component={Home}/> 
          <Route path="/updOperacion/:id" exact component={UpdateTransaction}/>
          <Route path="/CardsUpd/:id" exact component={UpdateFormCards}/>
          <Route path="/FormCards" exact component={FormCards}/>
          <Route path="/RecoverPassword" exact component={RecoverPassword}/>
          <Route path="/Operations" exact component={Operation}/>
          <Route path="/Graphics" exact component = {Graphics}/>
        </Switch>
        
          
      </div>
    </Router>
  );
}

export default App;
