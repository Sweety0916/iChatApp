//nodeserver with will handel socket io connection
const io = require('socket.io')(8000)
//i want socket.io on 8000 port after that running socket.io server 
//that is the instant of http
const users = {};
io.on('connection',socket =>{//this will tell who have joined eg:-sweety ,arpit
    
    socket.on('new-user-joined',name=>{
        console.log("New user",name)

users[socket.id]=name;//providing id who have joined by their  name
socket.broadcast.emit('user-joined',name);//this will tell new person joined by this name
//emit is used to print
    });
    //if someone send message and broadcast to eberyonr
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
        });
            socket.on('disconnect', message=>{
                socket.broadcast.emit('left',users[socket.id]);
                delete users[socket.id];
             });
})

