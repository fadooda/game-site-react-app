//for the chat server
import io from 'socket.io-client';
import axios from 'axios';
let chatSocket
const targetUrl = 'https://games-online-app.herokuapp.com/games/authenticate';
//const targetUrl = 'http://localhost:9000/games/authenticate';
const config = {
  headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` }
};

const ENDPOINT = 'https://chat-games-online-app.herokuapp.com/';
//const ENDPOINT = 'http://localhost:9000';

export const initiateChatSocket = () => {
    chatSocket = io(ENDPOINT)
    console.log(`Connecting socket...`);
    //socket.emit("generateRooms")
  }
  
  export const joinChatRoom = (name,room) => {
    chatSocket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }
  
  export const disconnectChatSocket = () => {
    console.log('Disconnecting socket...');
    if(chatSocket) {
      chatSocket.disconnect();
      chatSocket.off()
    }
  }
  export const subscribeToChatRoom = (callback) => { 
    chatSocket.on('message', message => {
        callback(message)
    });
}

export const getUsersChatRoom= (callback) => { 
    chatSocket.on("roomData", ({ users }) => {
        callback(users);
      });
}

export const sendMessageToChatRoom= (message) => { 
    if(message) {
        chatSocket.emit('sendMessage', message);
      }
}

export  const authenticateToken = () => axios.get(targetUrl,config)
        .then(res => { 
            console.log("here")
            console.log(res.data)
            return res.data})
        .catch(error =>{
            console.log("auth failed")
          alert(error)
          //window.location.href="/games/unAuthError"
        })