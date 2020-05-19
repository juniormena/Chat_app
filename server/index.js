const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {addUser,removeUser, getUser,getUsersInRoom} = require('./users.js')

io.on('connection',(socket)=>{
    socket.on('join',({name,room},callback)=>{
        console.log('new connection')
        const {error,user} = addUser({id:socket.id,name,room});

        if(error){
            return callback(error);
        }
        socket.emit('message',{user:'admin', text:`${user.name}, welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has join`})

        socket.join(user.room);
        io.to(user.room).emit('roomData', {room:user.room,users:getUsersInRoom(user.room)})
        callback();
    });

    socket.on('sendMessage', (message,callback)=>{
        const user = getUser(socket.id);
        console.log(user);
        io.to(user.room).emit('message', {user:user.name,text:message});
        io.to(user.room).emit('roomData', {room:user.room,users:getUsersInRoom(user.room)});
        callback();
    });

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`})
        }
    })
})


app.use(require('./router'));
server.listen(PORT,()=>console.log('running on port 5000'));