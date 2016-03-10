var EventEmitter = require('events');
var Elevator = require('./Elevator.js');
var util = require('util');


function ElevatorController(elevatorCount, floorCount) {
    this.availableElevators = [];
    this.floorCount = floorCount;

    this.movingElevators = [];


    for (var i = 0; i < elevatorCount; i++) {
        this.availableElevators.push(Elevator.create())
    }
    EventEmitter.call(this);
}
util.inherits(ElevatorController, EventEmitter);

// Need something to receive the requests for elevators


var controller = new ElevatorController(5, 1);
controller.on('is-opening-door', function(elevator) {
    this.elevators = this.elevators.map(function(e) {
        e.isOpeningDoor = true;
        return e;
    })
});

controller.on('is-closing-door', function(elevator) {
    this.elevators = this.elevators.map(function(e) {
        e.isOpeningDoor = false;
        return e;
    })
});
