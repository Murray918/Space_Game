class Actors {
	constructor(name){
		this.name
		this.playerHp = 20
		this.playerAcc = this.accGen(11,1)
		this.playerDam = 5
		this.playerImage = "player.png"
		this.choiceTime = false
		//Randomize the Alien's health between 3 and 6. We set 7 as max health so that Math.random() can generate a maximum
		//value of 6.99999. Math.floor() will round tha down to 6. Then we minus 3 so that are inclusive value is between 0 and 3.
		//Finally we add 3 so that if our lowest inclusive is 0, the alien's health will be 3 and if it's at its maximum
		//it'll be 6. This same logic is used on all the random values the alien has. Alien HP should be between 3 and 6
		this.alienHp = Math.floor(Math.random() * (7 - 3) + 3)
		this.alienDam = Math.floor(Math.random() * (5 - 2) + 2)
		this.alienAcc = this.accGen(11,1)
		this.alienImage = "alien.png"
	}
	//Generates a random number for either the player or alien
	accGen(max,min){
		 return Math.floor(Math.random() * (max - min) + min)
	}
}
let player = new Actors("player")
//Place holder for the players accuracy when the accGen function is called
let aliens = []
//has a for loop that creates 3 uniquely named aliens 6 times
//and pushes them into the aliens array
let createAliens = function(){
	let genRandomAliens = function(max,min){
		return Math.floor(Math.random() * (max - min) + min)
	}
	let randAlien = 0
		//create a loop that creates 6 aliens
		for(let i = 0; i < 6; i++){
			randAlien = genRandomAliens(4,1)
			aliens.push(alien = new Actors("alien"))
			//this if condition names the aliens which is used
			//to determine their random accuracy values later on
			if(randAlien === 1){
				alien.name = "alien6"
			}
			else if(randAlien === 2){
				alien.name = "alien7"
			}
			else{
				alien.name = "alien8"
			}
		}
}

//The player attack function is our main function in this script.
let playerAttack = function(){
	//set the players accuracy between 1 and 10
	player.playerAcc = player.accGen(11,1)
	$(".playerHp").text("Players HP" + " " + player.playerHp)
	console.log("player Acc", player.playerAcc)
	//If this players accuracy is greater than 3 the alien will be damaged or killed.
	if(player.playerAcc > 3){
			aliens[0].alienHp -= player.playerDam
			console.log("Player hits! Alien Health is now", aliens[0].alienHp)
			//if the alien does not die than it will counterattack by calling it's own attack function
			if(aliens[0].alienHp > 0){
				console.log("Alien counter attacks! player's hp is now ", player.playerHp)
				alienAttack()
			}
			//however; if the alien dies in 1 hit than it will be removed from the aliens array.
			else{
				aliens.shift()
				console.log("Alien dies. Remaining Aliens...", aliens.length)
				//once the alien dies there will be a prompt for the player to choose whether to run away
				// or continue fighting
				if(aliens.length > 0){
					$(".retreat").show("slow")
					//this stops the game from running until a choice is made.
					player.choiceTime = true
				}
				//if all the aliens are dead than the game is over and everything is hidden from
				//the HTML.
				else{
					console.log("GG ALIENS ALL DEAD")
					$(".alien").hide()
					$(".player").hide()
					$(".playAgain").fadeToggle("slow", "linear")
				}
			}
		}
		//if the player does not have an accuracy roll higher than 3 the alien will take it's turn.
		else{
			console.log("Player misses! Alien's turn")
			alienAttack()
		}
}

//This function essentially just lowers the player HP value
let alienAttack = function(){
	aliens.alienAcc = alien.accGen(11,1)
	//Sets the HTML text to reflect the players hp
	$(".playerHp").text("Players HP" + " " + player.playerHp)
	//This if condition checks for the aliens accuracy and which alien is attacking. Since each alien has a unique accuracy value
	//There needed to a be a check for each one.
	if(aliens[0].alienAcc > 2 && aliens[0].name == "alien8" || aliens[0].alienAcc > 3 && aliens[0].name == "alien7" || aliens[0].alienAcc > 4 && aliens[0].name == "alien6"){
		player.playerHp -= aliens[0].alienDam
		console.log("Alien Hits you! Player health is now", player.playerHp)
	}
	else{
		console.log("Alien misses")
	}
	//If the aliens are still in the array and the player is and it is not time to make a choice
	//the player will attack.
	if(aliens.length > 0 && player.playerHp > 0 && player.choiceTime == false){
		console.log("It is now the players turn")
		playerAttack()
	}
	//When the player dies the jquery will hide the alien and player images and ask
	//if the player would like to play again.
	else{
		console.log("The player has died")
		$(".playerHp").text("Players HP" + " " + player.playerHp)
		$(".player").hide()
		$(".alien").hide()
		$(".playAgain").fadeToggle("slow", "linear")
	}
}

//This function creates all of the elements for the DOM and starts the game off
//by calling the createAliens and player attack function.
let gameInitialize = function(){
	createAliens()
	//Set the players image
	let playerSprite = document.createElement("img")
	//which the players image will refer back to it's constructor image. The same is true for the alien.
	playerSprite.setAttribute("src", player.playerImage)
	let alienSprite = document.createElement("img")
	alienSprite.setAttribute("src", alien.alienImage)
	//135-139 put the sprites into the DOM and give them both a class
	$(".playerSide").append(playerSprite)
	$(".playerSide > img").addClass("player")
	$(".alienSide").append(alienSprite)
	$(".alienSide > img").addClass("alien")
	playerAttack()
}
gameInitialize()

//Logic for when the yes button is clicked.
$(".yes").click(function(){
	//when the player retreats the alien array is cleared
	aliens = []
	//the players health is set to 0
	player.playerHp = 0
	//the buttons and arena div are hidden
	$(".retreat").hide()
	$(".arena").hide()
	//the container will get a nice big text calling you a coward
	$(".container").append("<h3>You coward</h3>")
	//and this button will fade in and ask if you'd like to play again.
	$(".playAgain").fadeToggle("slow", "linear")
})
//Logic for when no button is clicked
$(".no").click(function(){
	//the buttons are hidden
	$(".retreat").hide()
	//the time for the player to choose is false so the game can continue to run
	player.choiceTime = false
	//and lastly the player attacks.
	playerAttack()
})
//Logic for if the player wishes to play more.
$(".playAgain").click(function(){
	//the aliens array is reset
	aliens = []
	//new aliens are created
	createAliens()
	//the playagain button is hidden
	$(".playAgain").hide()
	//and the sprites reappear
	$(".player").show()
	$(".alien").show()
	//players health is reset to full
	player.playerHp = 20
	//the player attacks which essentially restarts the game.
	playerAttack()
})
//Jacobs sneakily smart line of code for decimal values
// console.log(Math.round((Math.random()*0.3+0.6)*10)/10)