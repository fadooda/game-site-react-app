import React from "react";
import loginImg from "../../login.png";
import axios from 'axios';
import "./loginRegisterForm.css";
import "./spinner.css"
import './registerCallout.css'
import "./registerSnackbar.css"
import * as URLroutes from '../URLRoutes'
const emailRegex = RegExp(
  /([a-zA-Z0-9._-]+@([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+)/
);
var errorsFound="";
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showSnackbar: false,
      showCallout: false,
      userName: null,
      email: null,
      password: null,
      formErrors: {
        userName: "",
        email: "",
        password: "",
        isFormComplete: false
      }
    };
    //this.onChange = this.onChange.bind(this);
    //this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.userName!==null && this.state.password!==null && this.state.email!==null ){
      let formErrorsToChange = { ...this.state.formErrors };
      let {userName,email,password}= this.state
      formErrorsToChange.isFormComplete=false; //stop users from submitting more than one form
      //let formState= {...this.state};
      this.setState({
            formErrors: formErrorsToChange,
            loading: true
         });
      //this.setState({isFormComplete: false})
      // console.log(`
      //   --SUBMITTING--
      //   User Name: ${userName}
      //   Email: ${email}
      //   Password: ${password}
      // `);
      //promises
      //check values before sending props propergrate when the state changes. axiumns how to manage data  
      //react router //difference between component and container

      axios.post(URLroutes.registerURL, {userName,email,password})
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        if(res && res.status===204)
        {
          this.setState({
            loading: false,
            showSnackbar: true,
            showCallout: true
          });
        }
      }).catch(error =>{
        this.setState({
          loading: false,
          formErrors: {
            userName: "User Name already exist please choose another name",
            email: "",
            password: "",
            isFormComplete: false
          }
        });
      })
      setTimeout(()=>{
        this.setState({
          showSnackbar: false
        });
      }, 3000);
      /*
      fetch( targetUrl , { //look up redux, hoc pattern 
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(this.state)
    })//.then((result) => result.json())
    //.then((info) => { console.log(info); })*/
    }else{
      alert(":::Please enter a username, email and password to register:::")
    }

  };
  hideCallout= e =>{
    this.setState({showCallout: false})
  }
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    let formState= {...this.state}

    switch (name) {
      case "userName":
        formErrors.userName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }
    formState.formErrors=formErrors
    if(formValid(formState))
    {
      formErrors.isFormComplete=true;
    }else{
      formErrors.isFormComplete=false;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors, loading, showSnackbar,showCallout, userName} = this.state;
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
            <label htmlFor="userName">User Name:</label>
              <input
                className={formErrors.userName.length > 0 ? "error" : null}
                placeholder="User Name"
                type="text"
                name="userName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.userName.length > 0 && (
                <span className="errorMessage">{formErrors.userName}</span>
              )}
            </div>
            <div className="form-group">
            <label htmlFor="email">Email:</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="form-group">
            <label htmlFor="password">Password:</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
          </div>
        </div>
        <div className="footer">
        {(showCallout)? <div className="callout">
                            <div className="callout-header"> Hello {userName}, Welcome to Free Games Online</div>
                              <span className="closebtn" onClick={this.hideCallout}>×</span>
                              <div className="callout-container">
                                <p>You can now log in....Click to <a href="#">Learn more</a> </p>
                              </div>
                          </div> : null}
        {(showSnackbar)? <div id="snackbar" className="show">Successfully Registered</div> : null}
        {(loading) ? <div className='loader'></div> : <button type="submit" onClick={this.handleSubmit} disabled={!(formErrors.isFormComplete)} className="btnlogin">Register</button>}
        </div>
      </div>
    );
  }
}
