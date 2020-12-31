import io from 'socket.io-client';
let ticktactoeSocket
//for the tictactoe server
export const initiateTicTacToeSocket = () => {
  //ticktactoeSocket = io("https://games-online-app.herokuapp.com/")
  ticktactoeSocket = io("http://localhost:7000/")
  console.log(`Connecting socket...`);
  ticktactoeSocket.emit("generateRooms")
}
export const disconnectTicTacToeSocket =  () => {
  console.log('Disconnecting socket...');
  if(ticktactoeSocket) {
     //ticktactoeSocket.emit("leaveRoom",room,user)
      ticktactoeSocket.disconnect();
      ticktactoeSocket.off()
    

  }
}
export const leaveRoom =  (room,user) => {
  console.log('Disconnecting socket...');
  if(ticktactoeSocket) {
     ticktactoeSocket.emit("leaveRoom",room,user)
  }
}
export const subscribeToRemoveClientFromRoom = (room,user,cb) => {
  if (!ticktactoeSocket) return(true);
  ticktactoeSocket.on('disconnectClient', (data) =>{
    ticktactoeSocket.emit("leaveRoom",room,user)
    console.log("removing user")
    return cb(null,data)
    //console.log("rooms ="+rooms)
    //setRooms({roomListings})
  })
}
export const joinTicTacToeRoom = (room, user) => {
  if (ticktactoeSocket) {
    console.log("sending room details")
    console.log("user"+user)
    console.log("room"+room)
    ticktactoeSocket.emit("joinRoom",room,user)
  }
}

// //for the chat server

// export const initiateChatSocket = () => {
//   chatSocket = io("https://chat-games-online-app.herokuapp.com/")
//   console.log(`Connecting socket...`);
//   //socket.emit("generateRooms")
// }

// export const joinChatRoom = (name,room) => {
//   chatSocket.emit('join', { name, room }, (error) => {
//     if(error) {
//       alert(error);
//     }
//   });
// }

// export const disconnectChatSocket = () => {
//   console.log('Disconnecting socket...');
//   if(chatSocket) {
//     chatSocket.disconnect();
//     chatSocket.off()
//   }
// }