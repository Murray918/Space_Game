/*

Earth has been attacked by a horde of aliens! You are the captain of the USS Assembly on a mission to destroy every last alien ship. There are six alien ships. The aliens attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. You have initiative and will attack first. However, you can only engage the alien ships one at a time. After you have destroyed an alien ship, you have the option to attack the next ship or attempt a hasty retreat.

Example Game Round
You attack the first alien ship
If the ship survives, it attacks you
If you survive, you attack the ship again
If it survives, it attacks you again, and so forth until either ship is destroyed
If your ship is destroyed, you lose the game
If the alien ship is destroyed you have the option to attack the next ship or retreat
If you retreat, the game is over
You win the game if you destroy all six alien ships

hull		(Same as hitpoints) If hull reaches 0 or less, the ship is destroyed
firepower	The amount of damage done to the hull of the target with a successful hit
accuracy	is the chance between 0 and 1 that the ship will hit its target

Your ship has the following properties...
hull - 20
firepower - 5
accuracy - .7 

The alien ships should each have the following ranged properties determined randomly:
hull - between 3 and 6
firepower - between 2 and 4
accuracy - between .6 and .8 You should be battling six alien ships each with unique values.
*/

class shipStats {
	constructor (name) {
		this.name = name;
		//this.statsArray = statsArray;   //this array will have the following elements.  Hull, firepower and accuracy.
		this.hull = 0; //statsArray[0];
		this.firepower = 0; //statsArray[1];
		this.accruacy = 0; //statsArray[2];
	}

	currentHull () {
		return this.hull;
	}
	setStats (statsArray) {
		this.hull = statsArray[0];
		this.firepower = statsArray[1];
		this.accruacy = statsArray[2];
		return 0;

	}
}


class action extends shipStats{
	constructor (name) {
		super(name);
		//this.turn = 0;
	}

	attack (defender,attacker) {
		let i = 1;
		let x = 0;
		let moo = "";
		let f="";
//-------------------------------------------------------------------------------
//Giant while loop to simulate the battle
//-------------------------------------------------------------------------------
		while (attacker.hull > 0 && defender.hull > 0) {
//-------------------------------------------------------------------------------
//Calculate the defender's accuracy this turn
//-------------------------------------------------------------------------------
			x = Math.random();
//-------------------------------------------------------------------------------
//Defender scored a hit
//-------------------------------------------------------------------------------
			if (x <= defender.accruacy) {
				attacker.hull = attacker.hull - defender.firepower;
				//console.log("." + attacker.name);
				f = ".a" + attacker.name;
				//moo = $( "h5:contains('" + f + "')" ).text("Hull = " + attacker.hull);
				moo = $( "h5" ).filter(f).text("Hull = " + attacker.hull);
				//string = ".alien" + (i+1);
				$( "img" ).filter("." + attacker.name).css("padding", attacker.hull + "px");
				console.log(moo);
			}
			else
			{
				console.log("Defender Missed " + x);
			}
			//do stuff here
			console.log("attacker hull = " + attacker.hull);

//-------------------------------------------------------------------------------
//Attacker Turn assuming it survived
//-------------------------------------------------------------------------------
			if (attacker.hull > 0) 
			{
				x = Math.random();
				if (x <= attacker.accruacy ) 
				{
					defender.hull = defender.hull - attacker.firepower;
					$( ".defender" ).css("padding", defender.hull + "px");
					$( "h5" ).eq(6).text("Hull = " + earthDefender.hull);

				//console.log("defender hull = " + defender.hull);
				}
				else
				{
					console.log("Attacker Missed " + x);
				}
			}
			else 
			{
//-------------------------------------------------------------------------------
//Attacker Blew up.  Slowly hide the attacker from battle as it blew up
//-------------------------------------------------------------------------------
				//console.log("attack phase " + i + " over.  Attacker Loses hull = " + attacker.hull + " Defender Wins hull = " + defender.hull);
				$( ".statusLabel" ).text("Phase over. " + attacker.name + " Loses -- Defender Wins");
//-------------------------------------------------------------------------------
//Hide the image of the ship then hide the text with hull.  This does the explode effect.
//-------------------------------------------------------------------------------
				$( "img" ).filter("." + attacker.name).toggle( "explode" );
				f = ".a" + attacker.name;
				$( "h5" ).filter(f).toggle( "explode" );
				break;
			}
			if (defender.hull <= 0) 
			{
				$( ".statusLabel" ).text("Phase over.   " + attacker.name + " Wins -- Defender Loses");
//-------------------------------------------------------------------------------
//Hide the image of the ship then hide the text with hull.  This does the explode effect.
//-------------------------------------------------------------------------------
				$( "img" ).filter("." + defender.name).toggle( "explode" );
				f = ".d" + defender.name;
				$( "h5" ).filter(f).toggle( "explode" );
				
			}
			//console.log("attack phase " + i + " over.  Attacker hull = " + attacker.hull + " Defender hull = " + defender.hull);
			i++;
		}
		choseInterval = setInterval(blink_text_chose, 1000);
		return 0;
	}
}

//-------------------------------------------------------------------------------
//Create a function that will return a random value between the min and max
//-------------------------------------------------------------------------------
function random (min,max) {
	let math = 0;
	if (max > 1) {
		max++;
		math = Math.floor(Math.random() * (max - min) + min);
	}
	else {
		max = max+0.001;
		math = (Math.random() * (max - min) + min).toFixed(2);
	}
	return math;
}

//-------------------------------------------------------------------------------
//Tooltip function
//-------------------------------------------------------------------------------
$(function() {
    $( document ).tooltip();
});

//-------------------------------------------------------------------------------
//Flashing Text at startup
//-------------------------------------------------------------------------------
let interval = setInterval(blink_text, 1000);
function blink_text() {
    $('.startHere').fadeOut(500);
    $('.startHere').fadeIn(500);
}

//-------------------------------------------------------------------------------
//Flashing Text at startup
//-------------------------------------------------------------------------------
let choseInterval = 0;
$('.chose').hide();
function blink_text_chose() {
    $('.chose').fadeOut(500);
    $('.chose').fadeIn(500);
}




//-------------------------------------------------------------------------------
//Create the Defender
//-------------------------------------------------------------------------------
let earthDefender = new shipStats("defender");
earthDefender.setStats([20,5,0.7]);
$( "h5" ).eq(6).text("Hull = " + earthDefender.hull);

//-------------------------------------------------------------------------------
//Place the 6 alien attackers into an array
//-------------------------------------------------------------------------------
let aliens = [new shipStats("alien1"), new shipStats("alien2"),new shipStats("alien3"), new shipStats("alien4"),new shipStats("alien5"),new shipStats("alien6")];
let string = "";

//-------------------------------------------------------------------------------
//Assign stats for the 6 aliens
//-------------------------------------------------------------------------------
for (let i = 0; i < 6; ++i) {
	aliens[i].setStats([random(3,6),random(2,4),random(0.6,0.8)]);
	$( "h5" ).eq(i).text("Hull = " + aliens[i].hull);
	string = ".alien" + (i+1);
	$( string ).css("padding", aliens[i].hull + "px");
}

//-------------------------------------------------------------------------------
//Create a single action class
//-------------------------------------------------------------------------------
let globalAction = new action("who");

//console.log("Hull = " + earthDefender.currentHull());
//console.log("Hull = " + attacker.currentHull());

//-------------------------------------------------------------------------------
//Fight Click Function
//-------------------------------------------------------------------------------
let attacker = "";
let justObj = "";
let x = 0;
$( ".whoWins" ).hide();
$( ".fight" ).click(function() {
	clearInterval(interval);
	$( ".startHere" ).remove();
//-------------------------------------------------------------------------------
//Random alien is chosen to attack and splice it from the global aliens array
//-------------------------------------------------------------------------------
	if ( (aliens.length > 0) && (earthDefender.currentHull() > 0) ) {
		console.log(aliens.length-1);
		x = random(0,(aliens.length - 1));
		attacker = aliens.splice(x,1);
		justObj = attacker[0];
		attacker = justObj;
		console.log(attacker);
	
//-------------------------------------------------------------------------------
//Attack 1st alien ship
//-------------------------------------------------------------------------------
		globalAction.attack(earthDefender,attacker);
	} 

	if ( (aliens.length === 0) ) {
//-------------------------------------------------------------------------------
//Defender wins
//-------------------------------------------------------------------------------
		clearInterval(choseInterval);
		$( ".chose" ).remove();
		$( ".whoWins" ).text("Defender Wins.  Earth is Saved!!!").show();
	} else if (earthDefender.currentHull() <= 0) {
//-------------------------------------------------------------------------------
//Aliens win.  Earth is dddddddddooooooooommmmmmmmmeeeeeeddddd!!!!!!!!
//-------------------------------------------------------------------------------
		clearInterval(choseInterval);
		$( ".chose" ).remove();
		$( ".whoWins" ).text("Aliens Win.  Earth is Doomed!!!").show();
	}
	
	return 0;
});

$( ".flee" ).click(function() {
//-------------------------------------------------------------------------------
//Fleeing
//-------------------------------------------------------------------------------
	clearInterval(interval);
	$( ".startHere" ).remove();

	clearInterval(choseInterval);
	$( ".chose" ).remove();
	$( "img" ).filter("." + earthDefender.name).toggle( "pulsate" );
	f = ".d" + earthDefender.name;
	$( "h5" ).filter(f).toggle( "pulsate" );
	$( ".whoWins" ).text("Defender Retreats.  Earth is Doomed!!!").show();
	earthDefender.setStats([0,0,0]);
//-------------------------------------------------------------------------------
//Disable the buttons
//-------------------------------------------------------------------------------



	return 0;
});






//$("#someElement").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


/*
let container = $('#container');
console.log(container);

let h1 = $('<h1></h1>');
h1.append("Test JS Link");
container.append(h1);
*/