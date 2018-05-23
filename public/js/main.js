//  Connect to the server
var socket;
socket = io.connect('http://localhost:3000');

//  Wheel info
var wheelRadius   = 26,
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

//  Celestial object
var sputnikSpaceCraft = document.querySelector('.sputnik'),
    issSpaceCraft     = document.querySelector('.iss'),
    hubbleSpaceCraft  = document.querySelector('.hubble'),
    moonSpaceCraft    = document.querySelector('.moon');

//  Progress bar
var progressBar     = document.querySelector('.progress'),
    progressShip    = document.querySelector('.progress-ship'),
    milestoneBox    = document.querySelector('.milestone-box');
    progressWrapper = document.querySelector('.progress-bar');

//  Elements
var disDiv    = document.querySelector('.distance'),
    intro     = document.querySelector('.intro'),
    earth     = document.querySelector('.sky-background'),
    introNewt = document.querySelector('.newt'),
    cosmoNewt = document.querySelector('.newt-space');


//  Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//  Start intro sequence
async function startIntro() {
    //intro.classList.add('animate-intro');
    // LET THE INTRO RUN THEN HIDE IT
    await sleep(23000);
    intro.classList.add('hide');
    earth.classList.add('hide');
    disDiv.classList.remove('hide');
    milestoneBox.classList.remove('hide');
    progressWrapper.classList.remove('hide');

    for(let i = 0; i < star.length; i++) {
        star[i].classList.remove('hide');
    }
}

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

    if (percentageOfTrip > 100) {
        progressBar.style.width = '100%';
        progressShip.style.left = '100%';
    }

    if (wheelRotation.number === 1) {
        console.log('i will strat the intro');
        startIntro();
    }

    //  Add animations
    if (distanceMeter > 600 && distanceMeter < 620) {
        sputnikSpaceCraft.style.willChange = 'transform, translate';
        sputnikMilestone.classList.add('milestone-fade-in');
        sputnikSpaceCraft.classList.add('animate-space-craft');
    }

    if (distanceMeter > 1450 && distanceMeter < 1470) {
        issSpaceCraft.style.willChange = 'transform, translate';
        issMilestone.classList.add('milestone-fade-in');
        issSpaceCraft.classList.add('animate-space-craft');
    }

    if (distanceMeter > 2200 && distanceMeter < 2220) {
        hubbleSpaceCraft.style.willChange = 'transform, translate';
        hubbleMilestone.classList.add('milestone-fade-in');
        hubbleSpaceCraft.classList.add('animate-space-craft');
    }

    if (distanceMeter > 8000 && distanceMeter < 8020) {
        moonSpaceCraft.classList.remove('hide');
        moonSpaceCraft.classList.add('animate-moon');
    }

    if (distanceMeter > 9500 && distanceMeter < 9520) {
        moonSpaceCraft.classList.add('further-animate-moon');
    }

    if (distanceMeter > 9800 && distanceMeter < 9820) {
        moonSpaceCraft.classList.add('moon-landing');
        cosmoNewt.classList.add('land-on-moon');
    }
});

//  Pause timer
if (duration === 0) {
    pauseTimer();
}

function pauseTimer() {
    timerObj = setInterval(timer, 1000);
    function timer() {
        duration++

        //  Remove the pause from stars
        if (duration === 1) {
            for (let i = 0; i < star.length; i++) {
                star[i].classList.remove('paused');
            }
        }

        //  Pause the stars
        if (duration === 5) {
            for (let i = 0; i < star.length; i++) {
                star[i].classList.add('paused');
            }
        }
    }
}

//  Hide unused celestial objects
sputnikSpaceCraft.addEventListener('animationend', function() {
    this.style.willChange = 'auto';
    this.classList.add('hide');
})

issSpaceCraft.addEventListener('animationend', function() {
    this.style.willChange = 'auto';
    this.classList.add('hide');
})

hubbleSpaceCraft.addEventListener('animationend', function() {
    this.style.willChange = 'auto';
    this.classList.add('hide');
})

introNewt.addEventListener('animationend', function() {
    intro.classList.remove('hide');
})
