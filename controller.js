var handler = new require('events').EventEmitter();
var Elevators = require('./ElevatorSimulation.js');




handler.on('is-opening-door', Elevators.openDoor);

handler.on('is-closing-door', Elevators.closeDoor);

handler.on('elevator-requested', Elevators.fetchClosest);

handler.on('moving', function(elevator, floor) {
    this.movingElevators.push({
        elevator: elevator,
        floor: floor
    })
})
