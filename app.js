




// function to set random alien stats
function alienStats(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min 
}

function alienAccuracy(min, max) {
  return Math.random() * (max - min) + min;
}

function alienAttack() {
	let y = Math.random()
	if (y <= .6 || y <= .8){
		UssAssembly.hull -= alienStats(2,4)
		console.log("------------------------------")
		console.log("Alien has registered hit!")
		console.log("------------------------------")
	}
	else {
		console.log("-----------------")
		console.log("Alien has missed!")
		console.log("-----------------")
	}
}
function humanAttack() {
	let x = Math.random()
	if (x <= .7){
		alienShips[0].hull -= 5
		console.log("-------------------------------")
		console.log("UssAssembly has registered hit!")
		console.log("-------------------------------")
	}
	else {
		console.log("-------------------------------")
		console.log("Oh no...UssAssembly has missed!")
		console.log("-------------------------------")
	} 
}



let UssAssembly = {
	hull : 20,
	firepower : 5,
	accuracy: .7
}
// create alien class
 class aliens  {
 	constructor() {
	this.hull =  alienStats(3,6),
	this.firepower = alienStats(2,4),
	this.accuracy = alienAccuracy(.6,.8)
	}
}
//create alien ships and insert them into an alien ship object


let alienShips = []
for (i = 0; i < 6; i++){
	alienShips.push(new aliens)
}

function battle () {
	while (alienShips[0].hull >= 0 && UssAssembly.hull >= 0){
		humanAttack()
		alienAttack()
	}
	if (alienShips[0].hull <= 0){
		console.log("**************************************************")
		console.log("Alien ship has been destroyed! " + (alienShips.length -1) + " Alien ships left!")
		console.log("**************************************************")
		alienShips.shift()
	
	}
	else if (UssAssembly.hull <= 0){
		console.log("----------------------------")
		console.log("Our ship has been destroyed!")
		console.log("----------------------------")
	}
}

function victory () {
	if(alienShips.length === 0){
		console.log("All alien ships have been destroyed, Earth is saved!")
	}
	else {console.log("Our ships have been defeated...Earth is lost!")}
}

function newBattle() {
	while (alienShips.length != 0 && UssAssembly.hull > 0){
		battle()
}		 }
newBattle()
victory()