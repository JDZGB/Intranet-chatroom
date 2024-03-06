const http = require("http");
const express = require("express");
const socketIO = require("socket.io").Server;
const { Socket } = require("dgram");

const app = new express()
const server = http.createServer(app);
const io = new socketIO(server);

const sockets = {};
const history = [];

app.use(express.static('./web'));

io.on('connection',(socket) => {
    console.log('a user connected');

    const name = socket.handshake.query.name;
    sockets[name] = socket;

    socket.on('sendMessage',(content) => {
        console.log('recieve a message',name,content);
        const message = {
        time:Date.now(),
        sender:name,
        content
        };
        history.push(message);

        socket.broadcast.emit('recieveMessage',message);
    })

    socket.on('disconnect',(reason) => {
        delete sockets[name];
        console.log('a user disconnected',name,reason);
        io.sockets.emit('online',Object.keys(sockets));
    });

    socket.on('getHistory',(fn) =>{
        fn(history);
    });

    io.sockets.emit('online', Object.keys(sockets));
});


io.use((socket, next) => {
    console.log('a client incoming');
    const name = socket.handshake.query.name;
    const password = socket.handshake.query.password;

    const verify = socket.handshake.query.verify;
    if(verify){
        next();
        return;
    }
    if(!name){
        console.log('拒绝链接，没有用户名');
        next(new Error('empty'));
        return;
    }
    if(password != '1234'){
        console.log('密码错误');
        next(new Error('error'));
        return;
    }
    next();
})



server.listen(8000);