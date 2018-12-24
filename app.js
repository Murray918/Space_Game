
let hull = [3, 4, 5, 6];
let firepower = [2, 3, 4];
let accuracy = [0.6, 0.7, 0.8];

let x = Math.floor(Math.random() * 4);
let y = Math.floor(Math.random() * 3);


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



let one = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let two = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let three = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let four = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let five = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);
let six = new Alien(hull[Math.floor(Math.random() * 4)], firepower[Math.floor(Math.random() * 3)], accuracy[Math.floor(Math.random() * 3)]);



console.log(one)
console.log(two)
console.log(three)
console.log(four)
console.log(five)
console.log(six)
