var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var APP_ID = undefined;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});

/*===============================================================
     SERVEUR
=================================================================*/

console.log('== IO Start ==');

//Whenever someone connects this gets executed
/*
io.on('connection', function(socket) {
    //console.log('A user connected');
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function(socket) {
        console.log('A user disconnected', socket.id); // undefined
    });
});
*/
console.clear()
      
var apps = {}; //Keeps a table of all players, the key is the socket id
var bullet_array = []; // Keeps track of all the bullets to update them on the server 
var cnt = 0

io.on('connection', function(socket) {
    // réception 
    socket.on('server chat message', function(msg) {
        console.log(msg);
        msg = msg.toUpperCase(); 
        // émission
        io.emit('client chat message', msg);
    });
  
    socket.on('register', function(msg) {
        console.log("New application joined with state:",msg);
        io.emit('client chat message', msg.appli);
        apps[msg._id]= msg.appli
       
        console.log(apps) 
        var s = JSON.stringify(apps)
        console.log(s) 
        io.emit('client clear',0)
        io.emit('client chat message', s)
      
       /* var prop
        for (prop in apps) {
              console.log( prop + " : " + apps[prop]  );
          }*/
      
        //msg = msg.toUpperCase(); 
        // émission
        //io.emit('client chat message', msg);
    });
  
    socket.on('new-player',function(state){
      console.log("New player joined with state:",state);
      //players[socket.id] = state;
      // Broadcast a signal to everyone containing the updated players list
      //io.emit('update-players',players);
    })
  
});



io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected.`);

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
    
    delete apps[socket.id];
  });
});

//send data to client
setInterval(function() {
    io.emit('date', {
        'date': new Date().toLocaleTimeString()
    });
}, 1000);

/*===============================================================*/

/*
var EventEmitter = require('events').EventEmitter;
var jeu = new EventEmitter();

jeu.on('gameover', function(message) {
    console.log(message);
});
jeu.on('en_presence', function(message) {
    console.log(message);
    io.emit('info io', new Date().toLocaleTimeString() + ':: ' + message);
});
jeu.emit('gameover', 'Vous avez perdu !');
*/