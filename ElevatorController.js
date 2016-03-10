var Elevator = require('./Elevator.js')


function ElevatorController(elevatorCount, floorCount) {
    this.elevators = [];
    this.floorCount = floorCount;
    for (var i = 0; i < elevatorCount; i++) {
        this.elevators.push(new Elevator())
    }
}
