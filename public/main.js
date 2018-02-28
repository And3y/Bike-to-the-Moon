
//  Connect to the server
var socket;
socket = io.connect('http://localhost:3000');

//  Wheel info
var wheelRadius = 8;
var circumference = 2 * Math.PI * wheelRadius;

//  Logs roatation number from Johnny-Five in server
socket.on('rotation', function(wheelRotation){
    //console.log('Johnny-Five: ' + wheelRotation.number);
    //console.log('Distance: ' + ((wheelRotation.number * circumference) * 0.01).toFixed(2) + 'm');
    var distanceMeter = ((wheelRotation.number * circumference) * 0.01).toFixed(2)
    newDiv.innerHTML = 'Distance traveled: ' + distanceMeter + 'm';
});

//  Distance div
var newDiv = document.querySelector('.new');