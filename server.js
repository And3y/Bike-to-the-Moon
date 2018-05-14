//  Host a server on localhost:3000
var express = require('express'),
    app     = express(),
    server  = app.listen(3000);

//  Host files
app.use(express.static('public'));
console.log('My socket server is running');

//  Johnny-Five
var five  = require("johnny-five"),
    board = new five.Board();

// Socket.io
var socket = require('socket.io'),
    io     = socket(server);

//  Wheel rotation
var rotation = 0;

//  Fire when the magnet is detected
function magnetDetected() {
    rotation++
}

//  New socket connection
io.sockets.on('connection', function(socket) {
    console.log('New connection ' + socket.id);
});

//  Johnny-Five script
board.on("ready", function () {
    new five.Sensor("I0").on("change", function() {
        console.log(this.value);
        if (this.value > 520) {
            magnetDetected();

            var wheelRotation = {
                number: rotation,
                resetTimer: 0,
            }
            io.sockets.emit('rotation', wheelRotation);
        }
    });
});
