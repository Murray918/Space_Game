




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
		console.log("Alien has registered hit")
	}
	else {
		console.log("alien has missed")
	}
}
function humanAttack() {
	let x = Math.random()
	if (x <= .7){
		alienShips[0].hull -= 5
		console.log("UssAssembly has registered hit")
	}
	else {
		console.log("UssAssembly has missed")
	} 
}



let UssAssembly = {
	hull : 20,
	firepower : 5,
	accuracy: .7
}
// creat alien class
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
		console.log("alien ship has been destroyed!")
		alienShips.shift()
	
	}
	else if (UssAssembly.hull <= 0){
		console.log("Our ship has been destroyed!")
	}
}
function game () {
	if (alienShips.length != 0){
		battle()
		if (UssAssembly.hull >= 1){
			battle()
			if (UssAssembly.hull>= 1){
				battle()
				if (UssAssembly.hull >= 1){
					battle()
					if (UssAssembly.hull >=1){
						battle()
						if (UssAssembly.hull >= 1){
							battle()
						}else if(UssAssembly.hull<=0){console.log("UssAssembly has been destroyed...game over!")}
					}else if(UssAssembly.hull<=0){console.log("UssAssembly has been destroyed...game over!")}
				}else if(UssAssembly.hull<=0){console.log("UssAssembly has been destroyed..game over!")}
			} else if(UssAssembly.hull<=0){console.log("UssAssembly has been destroyed...game over!")}
		} else if (UssAssembly.hull <= 0){console.log("UssAssembly has been destroyed...game over!")}
	} else if (UssAssembly.hull <= 0){console.log("UssAssembly has been destroyed, game over!")}
	else if(UssAssembly.hull<=0){console.log("UssAssembly has been destroyed,game over!")}
}
function victory () {
	if(alienShips.length === 0){
		console.log("All alien ships have been destroyed, Earth is saved!")
	}
	else {console.log("Our ships have been defeated...Earth is lost!")}
}
game()
victory()
console.log(UssAssembly)
console.log(alienShips.length)
