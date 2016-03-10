
function Elevator() {
    this.currentFloor;
    this.isMoving;
    this.occupied;
    this.tripCount;
    this.passedFloors
    this.maintenanceMode;
}

Elevator.prototype.goTo = function(floor) {
    this.isMoving = true;
    this.tripCount++;
}

Elevator.prototype.isOpeningDoor = function() {
    this.fire('is-opening-door');
}

Elevator.prototype.isClosingDoor = function() {
    this.fire('is-closing-door');
}


module.exports = Elevator;
