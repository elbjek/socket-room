const express = require('express');
const app = express();
/*eslint-disable*/
const server = app.listen(3000, ()=>{
    console.log('Server running on 3000');
})

const io = require('socket.io')(server)

// var nsp = io.of('/chat');

io.on('connection', function(socket) {

    socket.on('sendMessage', function(data) {
        socket.emit('click', {socketid: socket.id, msgs: data, connected:"Connected to the server."});
        
    });
    // socket.on('disconnect', function(data) {
    //     console.log("Disconnected from the server " + data)
    //     socket.emit('disconnected', {msg:data})
    // });       

    socket.on('disconnect', (data) => {
        console.log("Disconnected from the server.")
        socket.emit('function',{msg:data})
      })
});