var Elevator = require('./Elevator.js');

function ElevatorSimulation(elevatorCount, floorCount) {
    this.availableElevators = [];
    this.movingElevators = [];
    this.totalElevators = [];
    this.floorCount = floorCount;


    for (var i = 0; i < elevatorCount; i++) {
        this.totalElevators.push(Elevator.create())
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
    // I doubt I'll get this right with the time left.
    // Would definitely want some tests too as it's pretty hairy.
    for (var i = 0; i < this.totalElevators.length; i++) {
        var elevator = this.totalElevators[i];
        if (!elevator.isOccupied && elevator.currentFloor === requestedFloor) {
            return elevator;
        }
    }

    var findClosest = function(acc, movingElevator) {
        var diff = Math.abs(movingElevator.currentFloor - requestedFloor);
        if (diff < acc.distance) {
            return {
                elevator: movingElevator,
                distance: diff
            }
        }
    }

    var defaults = {
        elevator: {},
        distance: this.floorCount
    }

    // Check moving elevators for closest occupied
    var closestOccupied = this.movingElevators.reduce(findClosest, defaults);
    // Find closest unoccupied
    var closestUnoccupied = this.availableElevators.reduce(findClosest, defaults);
    // Compare the two
    return closestOccupied.distance < closestUnoccupied.distance ?
        closestOccupied :
        closestUnoccupied;
}

ElevatorSimulation.prototype.setMoving = function(elevator, requestedFloor) {
    if (requestedFloor > this.floorCount || requestedFloor < 1) {
        console.error('Please pick a floor between 1 and %d', this.floorCount);
    }

    // In real life, this would need to be fancier since elevator is an object
    var alreadyAdded = this.movingElevators.indexOf(elevator) > -1;

    if (!alreadyAdded) {
        this.movingElevators.push({
            elevator: elevator,
            floor: requestedFloor
        })
    }
}

ElevatorSimulation.prototype.removeElevator = function(elevator) {
    this.totalElevators = this.totalElevators.filter(function(e) {
        // Of course, this won't work, but we could check if we had ID's
        // or something unique.
        return e !== elevator;
    })
}

ElevatorSimulation.prototype.checkStatus = function(elevator) {
    if (!elevator.isMoving) {
        this.movingElevators = this.movingElevators.filter(function(e) {
            return e.elevator !== elevator;
        })
    }
}


module.exports = {
    ElevatorSimulation: ElevatorSimulation,
    create: function(elevatorCount, floorCount) {
        return new ElevatorSimulation(elevatorCount, floorCount);
    }
}
