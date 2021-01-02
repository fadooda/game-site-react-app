import '../App.css';
import React, { useState } from 'react';
import LoginApp from './login/loginApp'
import * as ReactBoostrap from "react-bootstrap";
import loginImg from "../login.png";
function Navbar ()  {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogOut=() => {
    sessionStorage.clear()
    window.location.href="/"
  }
  const user = sessionStorage.getItem('user')
  
  return (
    <div className="App">
        <header className="main-navigation">
            <ReactBoostrap.Navbar  expand="xl" className="main-navbar">
              <ReactBoostrap.Navbar.Brand href="/">
              <img src={loginImg}  width="200" alt="" className="d-inline-block align-middle mr-2 img-fluid"/>
                <span className="text-uppercase font-weight-bold">FGO</span>
              </ReactBoostrap.Navbar.Brand>  
                <ReactBoostrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                <ReactBoostrap.Navbar.Collapse id="basic-navbar-nav">
                  <ReactBoostrap.Nav className="mr-auto">
                  <ReactBoostrap.Nav.Link href="/">Home</ReactBoostrap.Nav.Link>
                  <ReactBoostrap.Nav.Link href="/games/rooms">Games</ReactBoostrap.Nav.Link>  
                  </ReactBoostrap.Nav>
                  {user
                  ? <ReactBoostrap.Button variant="danger" className='loginorreg' onClick={handleLogOut}>Logout</ReactBoostrap.Button>
                  : <ReactBoostrap.Button variant="danger" className='loginorreg' onClick={handleShow}>Signup/Login</ReactBoostrap.Button>
                  }
                  </ReactBoostrap.Navbar.Collapse>
            </ReactBoostrap.Navbar>
        </header>
        <ReactBoostrap.Modal
          className='modal'
          show={show}
          onHide={handleClose}
          keyboard={false}
        >
            <LoginApp/>
        </ReactBoostrap.Modal>

    </div>
    
    );
    
  }

  export default Navbar;
