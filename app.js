
//Millenium Falcon (my Ship)
let falcon = {
	hull: 20,
	firepower: 5,
	accuracy: 0.7
};


//Alien Stats
let hull = [3, 4, 5, 6];
let firepower = [2, 3, 4];
let accuracy = [0.6, 0.7, 0.8];


//Alien constructor
class Alien {
	constructor (hull, firepower, accuracy){
		this.hull = hull
		this.firepower = firepower
		this.accuracy = accuracy
	}
	attack () {
		return
	}
};


// All six Aliens each with random stats
//Added a random function for each new alien in order to create a new number each time
let one = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let two = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let three = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let four = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let five = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let six = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);


//Console
/*
console.log(one)
console.log(two)
console.log(three)
console.log(four)
console.log(five)
console.log(six)
*/


//Batle
//while (falcon.hull>0) {
	if(Math.random()<=falcon.accuracy){
		one.hull -= falcon.firepower
	}
	if (one.hull>0 && Math.random()<=one.accuracy) {
		falcon.hull -= one.firepower
	}
//};

console.log (one)
console.log (falcon)








