import React, { Component } from "react";
import '../../App.css'
import unAuthpic from "../../401-error-wordpress-featured-image.jpg"
class unAuthError extends Component {

    render() {
  
      return (
        <div className="App">
          <img src={unAuthpic} className="App-unAuth"/>
        </div>
      );
    }
  }
  
  export default unAuthError;