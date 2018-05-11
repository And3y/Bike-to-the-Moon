//  Connect to the server
var socket;
socket = io.connect('http://localhost:3000');

//  Wheel info
var wheelRadius   = 25,
    circumference = 2 * Math.PI * wheelRadius;

    //  Timer
var timerObj,
    duration = 0

//  Distance
var distanceMeter = 0;

//  Logs roatation number from Johnny-Five in server
socket.on('rotation', function(wheelRotation) {
    //console.log('Johnny-Five: ' + wheelRotation.number);
    //console.log('Distance: ' + ((wheelRotation.number * circumference) * 0.01).toFixed(2) + 'm');
    duration = wheelRotation.resetTimer;
    distanceMeter = ((wheelRotation.number * circumference) * 0.01).toFixed(2)
    disDiv.innerHTML = 'Distance traveled: ' + distanceMeter + ' m';
    if (distanceMeter > 1000) {
        var distanceKm = (distanceMeter * 0.001).toFixed(2);
        disDiv.innerHTML = 'Distance traveled: ' + distanceKm + ' km';
    }

    if (distanceMeter === 8848) {
        mtEverest();
    }

    if (distanceMeter === 50000) {
        atmosphere();
    }

    if (distanceMeter === 215000) {
        sputnik()
    }

    if (distanceMeter === 340000) {
        iss();
    }

    if (distanceMeter === 515000) {
        hubble();
    }

    if (distanceMeter === 383000000) {
        moonApproach();
    }
});

if (duration === 0) {
    startTimer();
}

function startTimer() {
    timerObj = setInterval(timer, 1000);
    function timer() {
        duration++
        console.log(duration);

        if (duration === 1) {
            //fjern pauseklasse
        }

        if (duration === 10) {
            console.log('I have reached 10 and will stop animations!')
            // legg til pauseklasse
        }
    }
}

if (distanceMeter === 0) {
    // don't start anmation
}

//  Elements
var disDiv = document.querySelector('.distance');
//var addDistance = document.querySelector('.add');
/*
addDistance.addEventListener('mousedown', function(){
    distanceMeter + 1000;
});
*/


//  Milestones
function mtEverest() {
    // 8848 meter
    console.log("We've reached Mt. Everest");
};

function atmosphere() {
    // 50 000 meter
    console.log("We've reached the top of the stratosphere");
};

function sputnik() {
    // 215 000 meter
    console.log("We've reached the orbig of Sputnik-1");
};

function iss() {
    // 340 000 meter
    console.log("We've reached the orbit of ISS");
};

function hubble() {
    // 515 000 meter
    console.log("We've reached the orbit of the Hubble Telescope");
};

function moonApproach() {
    // 383 000 000 meter
    console.log("We're approaching the moon");
};
