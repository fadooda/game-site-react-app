import React, { Component } from "react";
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/other_pages/home'
import AboutMe from  './components/other_pages/aboutMe'
import GenerateRooms from './components/games/rooms'
import Ranking from './components/other_pages/rankings'
import unAuthError from './components/other_pages/401'
import Chat from './components/Chat/Chat'
import notFoundError from './components/other_pages/404'
import SaltyJeremy from './components/other_pages/SaltyJeremy'
import './App.css'
//import Join from './components/Join/Join'
//import About from './components/About'
//import LoginApp from './components/LoginApp'



class Header extends Component {
  render() {

    return (
      <div className="App">
        <div>
          <Navbar />   
        </div>
        <BrowserRouter>
          <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path= '/games/rooms' component={GenerateRooms}/>
          <Route exact path = '/games/unAuthError' component={unAuthError}/>
          <Route exact path = '/BannedSaltyPlayer' component={SaltyJeremy}/>
          <Route  path="/chat" component={Chat} />
          <Route path='/404' exact={true} component={notFoundError} />
          <Redirect to="/404"/>
          </Switch>
      </BrowserRouter>
      </div>

    )
  }
}

export default Header;