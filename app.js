// create Ship class to use as prototype of all ships in game
class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    attack(enemy) {
        if (Math.random() > this.accuracy) {
            console.log(`${this.name} missed`);
            return `${enemy.name} hull: ${enemy.hull}`
        } else {
            enemy.hull -= this.firepower;
            console.log(`${this.name} dealt ${this.firepower} damage.`);
            return `${enemy.name} hull: ${enemy.hull}`
        }
    }
}
// create USS Assembly ship with pre-determined parameters
let USSA = new Ship("USS Assembly", 20, 5, 0.7);

// create array to hold 6 alien ships with randomly generated parameter values that fit within pre-determined range
let alienFleet = [];

// create for loop to create 6 alien ship objects and push them into the
for (let i = 0; i < 6; i++) {
    alienFleet[i] = new Ship(`Alien Ship ${i+1}`,(Math.floor(Math.random() * (7 - 3) + 3)), (Math.floor(Math.random() * (5 - 2) + 2)), (Math.random() * (0.8 - 0.6) + 0.6))
}
console.log(alienFleet[0]);
console.log("==============================")
console.log(USSA);
console.log("==============================")
console.log(alienFleet[0].attack(USSA));
console.log("==============================")
console.log(USSA.attack(alienFleet[0]));
console.log("==============================")

// loop for whole game: while USSA hull >0 and alienFleet.length > 0

	// loop for one round: while USSA hull > 0 and alienFleet[i] hull > 0

	// USSA.attack(alienFleet[i])

	// if alienFleet[i].hull > 0 { alienFleet[i] attacks USSA }

	// else { 
		// remove 1st alien ship from alienFleet

		// prompt player to attack next alien ship or retreat

		// if retreat {
		// console.log("Game Over")
		// break;
		// }

	// }










