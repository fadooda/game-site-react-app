import React from "react";
import axios from 'axios';
import "./loginRegisterForm.css";
import "./spinner.css"
import * as URLroutes from '../URLRoutes'

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


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userName: null,
      password: null,
      formErrors: {
        userName: "",
        password: "",
        isFormComplete: false
      }
    };

  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.userName!==null && this.state.password!==null){
      let formErrorsToChange = { ...this.state.formErrors };
      let {userName,password}= this.state
      formErrorsToChange.isFormComplete=false; //stop users from submitting more than one form
      this.setState({
            formErrors: formErrorsToChange,
            loading: true
          });

      axios.post(URLroutes.loginURL,{userName,password})
      .then(res => {
        sessionStorage.setItem('user',this.state.userName)
        sessionStorage.setItem('accessToken',res.data.accessToken)
        window.location.href="/games/rooms"
      }).catch(error =>{
        this.setState({
          loading: false
        });
        if(error.response && error.response.status===401)
        {
          alert(":::Wrong password:::")
        }else if (error.response && error.response.status===404)
        {
          alert(":::User doesn't exist:::")
        }
        else {
            alert(":::Login server down for maintence:::")
          }
      })      
    }else{
      alert(":::Please enter a username and password:::")
    }

  };

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
    const { formErrors,loading } = this.state;
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
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
        {(loading) ? <div className='loader'></div> : <button type="submit" onClick={this.handleSubmit} disabled={!(formErrors.isFormComplete)} className="btnlogin">Login</button>}

        </div>
      </div>
    );
  }
}
