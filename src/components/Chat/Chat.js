import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Game from "../games/board_games/Game"
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import * as URLroutes from '../URLRoutes'
import './Chat.css';


let socket;

const Chat = ({ location }) => {
  const [name] = useState(sessionStorage.getItem('user'));
  const [room] = useState(sessionStorage.getItem('roomName'));
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {


    socket = io(URLroutes.ENDPOINT_CHAT);
    if(name&&room){
      
      socket.emit('join', { name, room }, (error) => {
        if(error) {
          alert(error);
        }
      });
    }else{
      alert("Please Login")
      window.location.href="/games/unAuthError"
    }

    
    return () => {
      //cleanup
      socket.disconnect()
      socket.off()
  }
  }, [URLroutes.ENDPOINT_CHAT, location.search]);
  
  useEffect(() => {

    if(name&&room){
      socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
      });
      
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }

    return () => {
      //cleanup
      socket.disconnect()
      socket.off()
  }
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message&&name&&room) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="innerContainer">
      <TextContainer users={users}/>
      <div>
          <Game/>
      </div>
      </div>      
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
