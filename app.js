// create Ship class to use as prototype of all ships in game
class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
    attack(enemy) {
        if (0 <= Math.random() <= this.accuracy) {
            enemy.hull -= this.firepower;
            console.log(`${this.firepower} damage dealt.`);
        } else {
            console.log(`missed`);
        }
    }
}
// create USS Assembly ship with pre-determined parameters
let USSA = new Ship(20, 5, 0.7);

// create array to hold 6 alien ships with randomly generated parameter values that fit within pre-determined range
let alienFleet = [];

// create for loop to create 6 alien ship objects and push them into the
for (let i = 0; i < 6; i++) {
    alienFleet[i] = new Ship((Math.floor(Math.random() * (7 - 3) + 3)), (Math.floor(Math.random() * (5 - 2) + 2)), (Math.random() * (0.8 - 0.6) + 0.6))
}

console.log(alienFleet[0])
console.log(alienFleet[1])
console.log(alienFleet[2])
console.log(alienFleet[3])
console.log(alienFleet[4])
console.log(alienFleet[5])