




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
		console.log("alien destroyed")
		alienShips.shift()
	
	}
	else if (UssAssembly.hull <= 0){
		console.log("human destroyed, game over!")
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
						}else if(UssAssembly.hull<=0){console.log("1game over")}
					}else if(UssAssembly.hull<=0){console.log("2game over")}
				}else if(UssAssembly.hull<=0){console.log("3game over")}
			} else if(UssAssembly.hull<=0){console.log("4game over")}
		} else if (UssAssembly.hull <= 0){console.log("5assembly destroyed,game over!")}
	} else if (UssAssembly.hull <= 0){console.log("6Assembly destroyed, game over!")}
	else if(UssAssembly.hull<=0){console.log("7Assembly destroyed,game over")}
}

game()
console.log(UssAssembly)
console.log(alienShips.length)
