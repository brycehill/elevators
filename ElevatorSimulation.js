var Elevator = require('./Elevator.js');

function ElevatorSimulation(elevatorCount, floorCount) {
    this.availableElevators = [];
    this.floorCount = floorCount;

    this.movingElevators = [];

    for (var i = 0; i < elevatorCount; i++) {
        this.availableElevators.push(Elevator.create())
    }
}

// get these args from cli or something
ElevatorSimulation.prototype.openDoor = function(elevator) {
    this.elevators = this.elevators.map(function(e) {
        e.isOpeningDoor = true;
        return e;
    })
}

ElevatorSimulation.prototype.closeDoor = function(elevator) {
    this.elevators = this.elevators.map(function(e) {
        e.isOpeningDoor = false;
        return e;
    })
}

ElevatorSimulation.prototype.fetchClosest = function(requestedFloor) {
    // loop through available elevators and find the elevator
    // that is closest to `requestedFloor` that is not moving.
    var this.availableElevators.filter(function(elevator) {
        if (!elevator.isMoving) {
            // elevator.currentFloor
        }
    })
}

ElevatorSimulation.prototype.setMoving = function(elevator, floor) {
    this.movingElevators.push({
        elevator: elevator,
        floor: floor
    })
}


module.exports = {
    ElevatorSimulation,
    create: function(elevatorCount, floorCount) {
        return new ElevatorSimulation(elevatorCount, floorCount);
    }
}
