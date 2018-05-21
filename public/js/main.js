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

//  Stars
var star = document.querySelectorAll('.star');

//  Milestones
var sputnikMilestone = document.querySelector('.sputnik-milestone'),
    issMilestone     = document.querySelector('.iss-milestone'),
    hubbleMilestone  = document.querySelector('.hubble-milestone');

//  Space crafts
var sputnikSpaceCraft = document.querySelector('.sputnik'),
    issSpaceCraft     = document.querySelector('.iss'),
    hubbleSpaceCraft  = document.querySelector('.hubble');

//  Progress bar
var progressBar  = document.querySelector('.progress'),
    progressShip = document.querySelector('.progress-ship');

//  Elements
var disDiv = document.querySelector('.distance');

//  Logs roatation number from Johnny-Five in server
socket.on('rotation', function(wheelRotation) {
    duration = wheelRotation.resetTimer;
    distanceMeter = ((wheelRotation.number * circumference) * 0.01).toFixed(2)
    disDiv.innerHTML = 'Distance traveled<br> <span class="distance-number">' + distanceMeter + ' m</span>';

    //  Convert to kilometers if over 1000 meters
    if (distanceMeter > 1000) {
        var distanceKm = (distanceMeter * 0.001).toFixed(2);
        disDiv.innerHTML = 'Distance traveled<br> <span class="distance-number">' + distanceKm + ' km</span>';
    }
    //  Progress bar
    var percentageOfTrip = (distanceMeter / 10000) * 100;
    progressBar.style.width = percentageOfTrip + '%';
    progressShip.style.left = (percentageOfTrip - 2) + '%';

    //  Call on animation functions
    if (distanceMeter > 600 && distanceMeter < 620) {
        sputnik()
        sputnikMilestone.classList.add('milestone-fade-in');
        sputnikSpaceCraft.classList.add('animate-space-craft');
    }

    if (distanceMeter > 1450 && distanceMeter < 1470) {
        iss();
        issMilestone.classList.add('milestone-fade-in');
        issSpaceCraft.classList.add('animate-space-craft');
        sputnikSpaceCraft.classList.add('hide');
    }

    if (distanceMeter > 2200 && distanceMeter < 2220) {
        hubble();
        hubbleMilestone.classList.add('milestone-fade-in');
        hubbleSpaceCraft.classList.add('animate-space-craft');
        issSpaceCraft.classList.add('hide');
    }

    if (distanceMeter > 2420 && distanceMeter < 2440) {
        hubbleSpaceCraft.classList.add('hide');
    }

    if (distanceMeter > 9000 && distanceMeter < 9020) {
        moonApproach();
    }
});

//  Pause timer
if (duration === 0) {
    startTimer();
}

function startTimer() {
    timerObj = setInterval(timer, 1000);
    function timer() {
        duration++

        if (duration === 1) {
            //fjern pauseklasse
            for (let i = 0; i < star.length; i++) {
                star[i].classList.remove('paused');
            }
        }

        if (duration === 5) {
            // legg til pauseklasse
            console.log('I have reached 10 and will stop animations!')
            for (let i = 0; i < star.length; i++) {
                star[i].classList.add('paused');
            }
        }
    }
}

// if (distanceMeter === 0) {
//     console.log('Distance is 0')
//     // don't start anmation
// }

//  Add animations
function sputnik() {
    console.log("We've reached the orbig of Sputnik-1");
};

function iss() {
    console.log("We've reached the orbit of ISS");
};

function hubble() {
    console.log("We've reached the orbit of the Hubble Telescope");
};

function moonApproach() {
    console.log("We're approaching the moon");
};
