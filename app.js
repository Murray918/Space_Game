
class ship {
	constructor(hull, firepower, accuracy, shipName, image){
		this.hull = hull
		this.firepower = firepower
		this.accuracy = accuracy
		this.shipName = shipName
		this.image = image
	}
	attack(target) {
		target.hull -= this.firepower
	}
}

let USS_Assembly = new ship(20, 5, .7, "USS_Assembly", "./Images/HeroShip.png")
$(".heroShipContainer").append(`<img src = ${USS_Assembly.image} class = "heroShip">`)

//let alienShip = new ship(4, 3, .7)

let alienShips = []

let usersClick = 0

for(let i = 0; i < 6; i++){
	alienShips[i]= new ship(Math.floor(Math.random() * 4 + 3), Math.floor(Math.random() * 4) + 1,(Math.random() * .2 + .6), "alienShip", "./Images/AlienShip.png")
	$(".enemyShipContainer").append(`<img src = ${alienShips[i].image} class = "alienShips${i} alienShips">`)
	$(`.alienShips${i}`).click(function(){
	usersClick = i
	console.log(usersClick)
})
}

let alienCounter = alienShips.length

let shipBattle = function(){
	while(USS_Assembly.hull > 0 && alienShips[usersClick].hull > 0){
	USS_Assembly.attack(alienShips[usersClick])
 	if(alienShips[usersClick].hull > 0){
 		alienShips[usersClick].attack(USS_Assembly)
 	}else{
 		$(`.alienShips${usersClick}`).fadeOut()
 		alienCounter -- 
 	}if(USS_Assembly.hull <= 0){
 		$(".heroShip").fadeOut()
 		$(".endScreen").show()
 	}if(alienCounter <= 0){
 		$(".winScreen").show()
 	}
  console.log(alienShips[usersClick])
  console.log(USS_Assembly)
}
}
$(".Attack").click(function(){
	shipBattle()
})

$(".Retreat").click(function(){
	$(".gameContainer").empty()
	$(".endScreen").show()
})

$(".endScreen").hide()
$(".winScreen").hide()



