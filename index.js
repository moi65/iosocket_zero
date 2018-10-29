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

/*===============================================================*/

console.log('== IO Start ==');

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });

});

io.on('connection', function(socket) {

    socket.on('chat message', function(msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });
});

/*===============================================================*/

var serialport = require('serialport');

// list serial ports:
serialport.list(function(err, ports) {
    ports.forEach(function(port) {
        console.log(port.comName);
        io.on('connection', function(socket) {
            io.emit('info message', port.comName);
        });
    });
});

var SerialPort = require('serialport');

var port = 'com5';
var sp = new SerialPort(port, {
    baudrate: 9600, // 57600
    parser: serialport.parsers.readline("\n")
});

sp.on('open', onPortOpen);
sp.on('data', onData);
sp.on('close', onClose);
sp.on('error', onError);

function onPortOpen() {
    console.log("YESSIR THE PORT IS OPEN COS CAPS");
}

var presence = false;
var precedent = '';

function onData(d) {
    d = d.trim();
    //console.log(d);
    if (d !== precedent) {
        // console.log(new Date().toLocaleTimeString() + "|  data dis, data dat " + d)
        precedent = d;
    }

    if (d.trim() === 'Ok, pir = 1') {
        //console.log("Présence: " + d);
        //io.emit('info io', new Date().toLocaleTimeString() + ':: Détecte une <b>présence</b>.');
        jeu.emit('en_presence', 'Au travail!');
    }
    if (d.trim() === 'Ok, pir = 0') {
        //console.log("Présence: " + d);
        //io.emit('info io', new Date().toLocaleTimeString() + ':: Détecte une <b>absence</b>');
        jeu.emit('en_presence', 'il est parti, repos!');

    }

    if (d === 'button = 1') {
        jeu.emit('en_presence', 'button ok!');

    }

}

function onClose() {
    console.log("Port is closed, yo");
}

function onError() {
    console.log("something went horribly wrong");
}

/*

*/

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