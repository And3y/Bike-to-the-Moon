//  Connect to the server
var socket;
socket = io.connect('http://localhost:3000');

//  Wheel info
var wheelRadius   = 8,
    circumference = 2 * Math.PI * wheelRadius;

var distanceMeter = 0;

//  Logs roatation number from Johnny-Five in server
socket.on('rotation', function(wheelRotation) {
    //console.log('Johnny-Five: ' + wheelRotation.number);
    //console.log('Distance: ' + ((wheelRotation.number * circumference) * 0.01).toFixed(2) + 'm');
    distanceMeter = ((wheelRotation.number * circumference) * 0.01).toFixed(2)
    disDiv.innerHTML = 'Distance traveled: ' + distanceMeter + ' m';
    if (distanceMeter > 1000) {
        var distanceKm = (distanceMeter * 0.001).toFixed(2);
        disDiv.innerHTML = 'Distance traveled: ' + distanceKm + ' km';
    }
});

//  Elements
var disDiv = document.querySelector('.distance');
//var addDistance = document.querySelector('.add');
/*
addDistance.addEventListener('mousedown', function(){
    distanceMeter + 1000;
});
*/
