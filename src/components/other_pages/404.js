import React from 'react'
// import './home.css'
import notFoundPic from "../../404-error.jpg"
const notFoundError = () =>{
return (
    <div >
        <img src={notFoundPic} className="App-unAuth"/>
    </div>
)

}

export default notFoundError