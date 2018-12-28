
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



//Battle Alien One

	if (Math.random()<=falcon.accuracy) {
		one.hull -= falcon.firepower
	}
	if (one.hull>0 && Math.random()<=one.accuracy) {
		falcon.hull -= one.firepower
	}

//Battle Alien Two
	if (Math.random()<=falcon.accuracy) {
		two.hull -= falcon.firepower
	}
	if (two.hull>0 && Math.random()<=two.accuracy) {
		falcon.hull -= two.firepower
	}

//Battle Alien Three
	if (Math.random()<=falcon.accuracy) {
		three.hull -= falcon.firepower
	}
	if (one.hull>0 && Math.random()<=three.accuracy) {
		falcon.hull -= three.firepower
	}


//Battle Alien Four
	if (Math.random()<=falcon.accuracy) {
		four.hull -= falcon.firepower
	}
	if (one.hull>0 && Math.random()<=four.accuracy) {
		falcon.hull -= four.firepower
	}


//Battle Alien Five
	if (Math.random()<=falcon.accuracy) {
		five.hull -= falcon.firepower
	}
	if (one.hull>0 && Math.random()<=five.accuracy) {
		falcon.hull -= five.firepower
	}


//Battle Alien Six
	if (Math.random()<=falcon.accuracy) {
		six.hull -= falcon.firepower
	}
	if (one.hull>0 && Math.random()<=six.accuracy) {
		falcon.hull -= six.firepower
	}


//Console
console.log(one)
console.log(two)
console.log(three)
console.log(four)
console.log(five)
console.log(six)
console.log (falcon)








