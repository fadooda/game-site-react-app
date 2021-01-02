import React, {useState,useEffect} from 'react'
import { initiateTicTacToeSocket, disconnectTicTacToeSocket,
  subscribeToTicTacToeRooms } from './socket';
import * as ReactBoostrap from "react-bootstrap";
import {authenticateToken} from '../authenticateToken';
import roomImg from '../../onevsone.jpg';
import "./roomCard.css";


function GenerateRooms() {
  const [rooms, setRooms] = useState();
  /**
   * useEffect():
   * why this works is because useeffect mounts (and renders atleast once) and listens for event  
   * first fire an emit to the server that is listening to the channel 'generateRooms'
   * then subscribe/listen to the topic 'generateRooms' 
   * so when the server fires back an event(the list of rooms) this component will listen and capture the room detail data 
   */

  useEffect(() => {
      authenticateToken().then(data => {
        if(data){
          initiateTicTacToeSocket()
          subscribeToTicTacToeRooms((err,roomListings)=>{
            let roomsWithIsFullGui = []
            for(let index = 0 ;index<roomListings.length; index ++){
              if(roomListings[index].userCount===2)
              {
                roomsWithIsFullGui.push({room: roomListings[index], isRoomFull: true })
              }else{
                roomsWithIsFullGui.push({room: roomListings[index], isRoomFull: false })
              }
            }
            setRooms(roomsWithIsFullGui)
          })
        }
      }).catch(error => {
        alert(error)
        sessionStorage.clear()
        window.location.href="/games/unAuthError"
      })

    
    return () =>{
      disconnectTicTacToeSocket()
    } 
  }, []);


 async function joinRoom(card)
  {
    await sessionStorage.setItem('roomName',card.title)
    window.location.href="/Chat/Chat"
  }  

   function handleSubmit(obj) {
    // check to see if the choosen room is full
     joinRoom(obj);
  };
  const renderCard= ({room,isRoomFull}, index) =>{
    return(
        <ReactBoostrap.Card style={{ width: '18rem' }} key={index} className="box">
        <ReactBoostrap.Card.Img variant="top" style={{  height: '50%'}} src="holder.js/100px180" src={roomImg} className="img-fluid"/>
        <ReactBoostrap.Card.Body >
          <ReactBoostrap.Card.Title>{room.title}</ReactBoostrap.Card.Title>
          <ReactBoostrap.Card.Text>
              {room.text }<br></br> 
              {room.userCount + ' out of 2'}
          </ReactBoostrap.Card.Text>
          {(isRoomFull)? <span>FULL</span> : <ReactBoostrap.Button variant="primary" onClick={() => handleSubmit(room)} type="submit" >Join Room</ReactBoostrap.Button>}
        </ReactBoostrap.Card.Body>
      </ReactBoostrap.Card>
     )
    }
  return (
    <div className="grid">
      {rooms && rooms.map(renderCard)}
    </div>
  );
}

export default GenerateRooms

