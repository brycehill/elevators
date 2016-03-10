var emitter = new require('events').EventEmitter();
var MAX_TRIPS = 100;

function Elevator() {
    this.currentFloor = 1;
    this.isMoving = false;
    this.occupied = false;
    this.tripCount = 0;
    this.passedFloors;
    this.maintenanceMode;
}

Elevator.prototype.goTo = function(floor) {
    this.isMoving = true;
    this.destination = floor;
    emitter.emit('moving', this, floor);
}

Elevator.prototype.stop = function(currentFloor) {
    this.currentFloor = currentFloor;
    if (currentFloor === this.destination) {
        this.isMoving = false;
        this.tripCount++;
        if (this.tripCount > MAX_TRIPS) {
            this.maintenanceMode = true;
            emitter.emit('out-of-service', this);
        }
    } else {
        this.goTo(this.destination);
    }
    emitter.emit('stopped', this);
}

Elevator.prototype.isOpeningDoor = function() {
    emitter.emit('is-opening-door', this);
}

Elevator.prototype.isClosingDoor = function() {
    emitter.emit('is-closing-door', this);
}


module.exports = {
    create: function() {
        return new Elevator();
    }
};
