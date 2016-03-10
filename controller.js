var handler = new require('events').EventEmitter();
var Elevators = require('./ElevatorSimulation.js');

// Update individual elevator's state
handler.on('is-opening-door', Elevators.openDoor);
handler.on('is-closing-door', Elevators.closeDoor);
handler.on('moving', Elevators.setMoving)

// Handle requests from user.
handler.on('elevator-requested', Elevators.fetchClosest);
