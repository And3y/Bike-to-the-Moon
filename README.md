# Journey to the Moon

A speedometer created with an Arduino to measure distance traveled, and display
the distance on a webpage.

We've been using [Socket.io](https://socket.io/), [Johnny-Five](http://johnny-five.io/) and [Express](https://expressjs.com/).

## Installing
Download the dependencies with
```
$ npm install
```
Connect a Hall sensor on pin I0 on a Tinkerkit Shield connected to your Arduino.

## Run the script
```
$ npm start
```
Go to localhost:3000 to see the readout from the speedometer.