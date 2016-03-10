var EventEmitter = require('events');
var util = require('util');


function Elevator() {
    this.currentFloor;
    this.isMoving;
    this.occupied;
    this.tripCount;
    this.passedFloors;
    this.maintenanceMode;
    EventEmitter.call(this);
}
util.inherits(Elevator, EventEmitter);

Elevator.prototype.goTo = function(floor) {
    this.isMoving = true;
    this.destination = floor;
    this.emit('moving', this, floor);
}

Elevator.prototype.stop = function(currentFloor) {
    this.currentFloor = currentFloor;
    if (currentFloor === this.destination) {
        this.isMoving = false;
        this.tripCount++;
    }
    this.emit('stopped', this);
}

Elevator.prototype.isOpeningDoor = function() {
    this.emit('is-opening-door', this);
}

Elevator.prototype.isClosingDoor = function() {
    this.emit('is-closing-door', this);
}


module.exports = {
    create: function() {
        return new Elevator();
    }
};
