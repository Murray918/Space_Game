class Ship {
	constructor(shipName, hull, firepower, accuracy, shipCount, img) {
		this.shipName = shipName
		this.hull = hull
		this.firepower = firepower
		this.accuracy = accuracy
		this.shipCounter = shipCount
		this.img = img
	}
	stillAlive() {
		if(this.hull > 0)
			return true
	}
	attack(target) {
		if((Math.round((Math.random()*0.9+0.1)*10)/10)>(1-this.accuracy)) {
			if(target.hull<this.firepower)
				target.hull = 0
			else
				target.hull-=this.firepower
			console.log(this.shipName+" hit "+target.shipName+" for "+this.firepower+" damage!")
		}
		else {
			console.log(this.shipName+" missed!")
		}
	}
}
let alienBoss = null
let USS_Assembly = null
let alienShips = []
let shipCount = 1
let chooseShip = 0
function populateBattle() {
	USS_Assembly = new Ship("USS_Assembly", 20, 5, .7, 0, "./images/heroShip.png")
	alienBoss = new Ship("Alien Boss", 20, 6, .7, 0, "./images/alienShip.jpg")
	USS_Assembly.shields = Math.floor(Math.random()*6+5)
	USS_Assembly.missles = 3
	let randomAliens = 1//Math.floor(Math.random()*4+6)
	for(let i = 0;i<randomAliens;i++) {
		alienShips[i] = new Ship("Alien Ship "+(i+1), Math.floor(Math.random()*4+3), Math.floor(Math.random()*3+2), Math.round((Math.random()*0.3+0.6)*10)/10, i+1, "./images/alienShip.jpg")
	}
	console.log(alienShips)
	$("#playerUIContainer").prepend(`<img src="${USS_Assembly.img}" class="heroShip"></img>`)
	for(let ship of alienShips) {
		$("#enemyContainer").append(`<img src="${ship.img}" class="alienShip alienShip${shipCount}"></img>`)
		$(`.alienShip${shipCount}`).click(function() {
			chooseShip = ship.shipCounter
			console.log(`alienShip${chooseShip}`)
			$(".alienShip").css({"border":"none"})
			$(this).css({"border":"solid white"})
		})
		$(`.alienShip${shipCount}`).mouseenter(function(){
			$("#enemyStatsContainer").show().append(`<ul>
													   <li>${ship.shipName}</li>
													   <li>Hull Integrity: ${ship.hull}</li>
													   <li>Damage: ${ship.firepower}</li>
													   <li>Accuracy: ${ship.accuracy}</li>
													 </ul>`)
		})
		$(`.alienShip${shipCount}`).mouseleave(function(){
			$("#enemyStatsContainer").hide().empty()

		})
		shipCount++
	}
	shipCount--
}
let missleChoice = false
let bossEncounter = false
function shipBattle(shipChoice) {
	shipChoice--
	console.log(alienShips[shipChoice])
	while(USS_Assembly.stillAlive() && alienShips[shipChoice].stillAlive()) {
		console.log(shipChoice)
		let oldPower = USS_Assembly.firepower
		if(missleChoice && USS_Assembly.missles>0) {
			USS_Assembly.firepower=10
			USS_Assembly.missles--
			missleChoice = false
		}
		USS_Assembly.attack(alienShips[shipChoice])
		USS_Assembly.firepower = oldPower
		if(alienShips[shipChoice].stillAlive()) {
			let attackAfterShield = 0
			let oldFirePower = alienShips[shipChoice].firepower
			if(USS_Assembly.shields<alienShips[shipChoice].firepower) {
				//console.log("Hello")
				attackAfterShield = alienShips[shipChoice].firepower-USS_Assembly.shields
			}
			alienShips[shipChoice].firepower = attackAfterShield
			alienShips[shipChoice].attack(USS_Assembly)
			alienShips[shipChoice].firepower = oldFirePower
			if(USS_Assembly.shields>0) {
				USS_Assembly.shields-=oldFirePower
			} 
			else {
				USS_Assembly.shields = 0
			}
			
		}
		else
		{
			$(`.alienShip${shipChoice+1}`).fadeOut()
			shipCount--
			console.log(alienShips[shipChoice].shipName+" has been destroyed!")
		}
		refreshStats()	
	}
	if(shipCount<=0 && !bossEncounter) {
				bossEncounter = true
				alienShips = []
				alienShips.push(alienBoss)
				$("#enemyContainer").append(`<img src="./images/alienShip.jpg" class="alienBoss"></img>`)
				$(`.alienBoss`).click(function() {
					chooseShip = 1
					$(".alienBoss").css({"border":"none"})
					$(this).css({"border":"solid white"})
				})
				$(`.alienBoss`).mouseenter(function(){
				$("#enemyStatsContainer").show().append(`<ul>
														   <li>${alienBoss.shipName}</li>
														   <li>Hull Integrity: ${alienBoss.hull}</li>
														   <li>Damage: ${alienBoss.firepower}</li>
														   <li>Accuracy: ${alienBoss.accuracy}</li>
														 </ul>`)
				})
				$(`.alienBoss`).mouseleave(function(){
					$("#enemyStatsContainer").hide().empty()
				})
		}
		if(!alienBoss.stillAlive()) {
			$('.alienBoss').fadeOut()
			$(".enemyDeathContainer").show()
		}
		if(!USS_Assembly.stillAlive()) {
			$(".heroShip").fadeOut()
			$(".gameOverContainer").show()
		}
}
function refreshStats() {
	$(".playerStats").empty()
	$(".playerStats").append(`<p>${USS_Assembly.shipName}</p>
							  <p>Hull Integrity: ${USS_Assembly.hull} Shields: ${USS_Assembly.shields}</p>
							  <p>Damage: ${USS_Assembly.firepower} Accuracy: ${USS_Assembly.accuracy}</p>
							  <p>Missles: ${USS_Assembly.missles}</p>`)
}
$(".reset").click(function() {
	bossEncounter = false
	USS_Assembly = null
 	alienShips = []
 	shipCount = 1
 	chooseShip = 0
	$(".heroShip").remove()
	$(".enemyDeathContainer").hide()
	$(".gameOverContainer").hide()
	$("#enemyContainer").empty()
	populateBattle()
	refreshStats()
})
populateBattle()
refreshStats()
$("#missles").click(function() {
	missleChoice = true
})
$("#attack").click(function(){shipBattle(chooseShip)})
$("#enemyStatsContainer").hide()
$(".enemyDeathContainer").hide()
$(".gameOverContainer").hide()










