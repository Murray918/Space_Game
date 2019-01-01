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
"use strict";

class shipStats {
	constructor (name,iName) {
		this.name = name;
		this.iName = iName;
		//this array will have the following elements.  Hull, firepower and accuracy.
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
	constructor (name,iName) {
		super(name,iName);
	}

//*******************************************************************************
//Attack Function inside of the action class
//*******************************************************************************
	attack (defender,attacker, aliens) {
		let i = 1;
		let x = 0;
		//let moo = "";
		let f="";
		let attacker2 = {};
		let justObj = [];
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
				//f = ".a" + attacker.iName;
				//moo = $( "h5:contains('" + f + "')" ).text("Hull = " + attacker.hull);
				$( "h5" ).filter(".a" + attacker.iName).text("Hull = " + attacker.hull);
				//string = ".alien" + (i+1);
				$( "img" ).filter("." + attacker.iName).css("padding", attacker.hull + "px");
				//console.log(moo);
			}
			else
			{
				console.log("Defender Missed " + x);
			}
			//do stuff here
			//console.log("attacker hull = " + attacker.hull);

//-------------------------------------------------------------------------------
//Attacker Turn assuming it survived
//-------------------------------------------------------------------------------

			if (attacker.hull > 0) 
			{
				x = Math.random();
				if (x <= attacker.accruacy ) {
					defender.hull = defender.hull - attacker.firepower;
					$( ".defender" ).css("padding", defender.hull + "px");
					$( "h5" ).filter(".ddefender").text("Hull = " + earthDefender.hull);
					
					/*
					if (checked)  //firing twice for hard mode
					{
						defender.hull = defender.hull - attacker.firepower;
						$( ".defender" ).css("padding", defender.hull + "px");
						$( "h5" ).filter(".ddefender").text("Hull = " + earthDefender.hull);
					}
					*/
				//console.log("defender hull = " + defender.hull);
				}
				else
				{
					console.log("Attacker Missed " + x);
				}
				
//one other aliens can fire too
				let whichOtherAliens = 0;
				if (checked === true) { 
					if (aliens.length > 1) {
						
						if (aliens.length === 2) {
							whichOtherAliens = 0;
						}
						else {
							whichOtherAliens = random(0,(aliens.length-1));
						}
						
						//console.log(aliens);
						//console.log("alien length = " + aliens.length);
						//console.log("other = " + whichOtherAliens)
						//console.log(aliens.slice(whichOtherAliens,whichOtherAliens+1));
						
						attacker2 = aliens.slice(whichOtherAliens,whichOtherAliens+1);
						//console.log(aliens)
						justObj = attacker2[0];
						attacker2 = justObj;
						x = Math.random();
						if (x <= attacker2.accruacy ) {
							defender.hull = defender.hull - attacker2.firepower;
							$( ".defender" ).css("padding", defender.hull + "px");
							$( "h5" ).filter(".ddefender").text("Hull = " + earthDefender.hull);
						}
						else {
							console.log("Attacker2 Missed " + x);
						}
					}
				}
			}
			i++;
		}
		return 0;
	}

//*******************************************************************************
//Attack phase finished.  Determine who won and such.
//*******************************************************************************	
	afterFight (defender,attacker) {
		//let moo = "";
		let f="";
		if ( (aliens.length >= 0) && (attacker.hull <= 0) ) {
//-------------------------------------------------------------------------------
//Defender wins and Attacker Blew up.  Slowly hide the attacker from battle as it blew up
//-------------------------------------------------------------------------------
			//console.log("attack phase " + i + " over.  Attacker Loses hull = " + attacker.hull + " Defender Wins hull = " + defender.hull);
			//$( ".statusLabel" ).text("Phase over. " + attacker.name + " Loses -- Defender Wins");
//-------------------------------------------------------------------------------
//Hide the image of the ship then hide the text with hull.  This does the explode effect.
//-------------------------------------------------------------------------------
			$( "img" ).filter("." + attacker.iName).toggle( "explode" );
			//f = ".a" + attacker.iName;
			$( "h5" ).filter(".a" + attacker.iName).toggle( "explode" );
			
		} 
		if (defender.hull <= 0) {
//-------------------------------------------------------------------------------
//Aliens win.  Earth is dddddddddooooooooommmmmmmmmeeeeeeddddd!!!!!!!!
//-------------------------------------------------------------------------------
			clearInterval(choseInterval);
			$( ".chose" ).stop().hide();
			$( ".whoWins" ).text("Aliens Win.  Earth is Doomed!!!").show();
			$( ".flee" ).prop("disabled", true);    //this refers to .flee class
	   		$( ".fight" ).prop("disabled", true);
	   		$( ".statusLabel" ).text("Phase over.   " + attacker.name + " Wins -- Defender Loses");
//-------------------------------------------------------------------------------
//Hide the image of the ship then hide the text with hull.  This does the explode effect.
//-------------------------------------------------------------------------------
			$( "img" ).filter("." + defender.iName).toggle( "explode" );
			//f = ".d" + defender.iName;
			$( "h5" ).filter(".d" + defender.iName).toggle( "explode" );
			$( ".alien_pics").children().unbind( "click" );
			$(".flee").hide();
			$( ".instr" ).text("Push Replay button to Start Over")
			return 0;
		} 

		if ( (aliens.length === 0) ) {
			clearInterval(choseInterval);
			$( ".chose" ).stop().hide();
			$( ".whoWins" ).text("Defender Wins.  Earth is Saved!!!").show();
			$( ".flee" ).prop("disabled", true);    //this refers to .flee class
	   		$( ".fight" ).prop("disabled", true);
	   		$( ".instr" ).text("Push Replay button to Start Over")
	   		//$('#btn2').prop("disabled", true);
		}
	}

} //end of action class



//*******************************************************************************
//Create a function that will return a random value between the min and max
//*******************************************************************************
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

//*******************************************************************************
//Tool Tip function.  To activate make a attribute called "title" 
//inside the element in the html or using jquery 
//*******************************************************************************
$(function() {
    $( document ).tooltip();
});

//*******************************************************************************
//Flashing Text at Startup Function.  This one blinks to the right of the fight button
//*******************************************************************************
let interval = 0 
function blink_text() {
    $('.startHere').fadeOut(500);
    $('.startHere').fadeIn(500);
}

//*******************************************************************************
//Flashing Text at Startup Function.  This one blinks between the buttons 
//*******************************************************************************
var choseInterval = 0;
$('.chose').hide();
function blink_text_chose() {
    $('.chose').fadeOut(500);
    $('.chose').fadeIn(500);
}

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//Start of the game
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
let earthDefender = 0;
let string = "";
let string2 = "";
let container = $('.alien_pics');
let globalAction = 0;
let fire = 0;
let checked = 0;

//-------------------------------------------------------------------------------
//Place up to 8 alien attackers into an array
//-------------------------------------------------------------------------------
let aliens = [new shipStats("Predators","alien1"), new shipStats("Empire", "alien2"),
			  new shipStats("Borg", "alien3"), new shipStats("Count Dooku","alien4"),
			  new shipStats("Kligons","alien5"),new shipStats("Geonosians","alien6"),
			  new shipStats("Mega Godzilla","alien7"),new shipStats("Godzilla","alien8")];
let numAliens = 0;

function doGame() {
	aliens = [new shipStats("Predators","alien1"), new shipStats("Empire", "alien2"),
				  new shipStats("Borg", "alien3"), new shipStats("Count Dooku","alien4"),
				  new shipStats("Kligons","alien5"),new shipStats("Geonosians","alien6"),
				  new shipStats("Mega Godzilla","alien7"),new shipStats("Godzilla","alien8")];
	

	
	numAliens = random(4,aliens.length);
	container = $('.alien_pics');
	checked = $(".moo").is( ":checked" )
	$(".flee").show();
	//$( ".instr" ).hide();

	$( "input" ).checkboxradio();
	$( ".flee" ).prop("disabled", true);    //this refers to .flee class
	$( ".fight" ).prop("disabled", true);
	


	//-------------------------------------------------------------------------------
	//Create the Defender
	//-------------------------------------------------------------------------------
	earthDefender = new shipStats("USS Assembly","defender");
	
	if (!checked) {
		earthDefender.setStats([20,5,0.7]);
	}
	else {   //hard mode Defender gets extra shields
		earthDefender.setStats([(20+random(10,15)),5,0.7]);
	}

	
	$( "h5" ).filter(".ddefender").text("Hull = " + earthDefender.hull);
	$( "h2" ).eq(0).text("Earth is peacefully defended by " + earthDefender.name);
	$( "img" ).filter(".defender").css("padding", earthDefender.hull);
	$( "img" ).filter(".defender").css("background","green");
	window.setTimeout(() =>{ $( "h2" ).eq(0).text("Aliens incoming. Prepare to fight " + earthDefender.name); },2000); 
	$('.startHere').hide();



	//-------------------------------------------------------------------------------
	//Select a random number of aliens
	//-------------------------------------------------------------------------------

	aliens.splice(numAliens,6);   //splice off the unused aliens from the array

	//-------------------------------------------------------------------------------
	//Add the alien pictures to the DOM and assign the aliens values
	//-------------------------------------------------------------------------------

	for (let i = 0; i < numAliens; ++i) {
		string = "<span><img class=\"" + aliens[i].iName + "\" src=\"pictures/" + aliens[i].iName + ".jpg\" title=\"" + aliens[i].name + "\" style=\"display:none\" ><h5 class=\"a" + aliens[i].iName + "\"  \
		style=\"display:none\">Hull = </h5></span>";
		//console.log(string)
		container.append(string);
		aliens[i].setStats([random(3,6),random(2,4),random(0.6,0.8)]);
		//aliens[i].setStats([random(3,6),20,random(0.6,0.8)]);   //use this to test blowing up the defender
		$( "h5" ).filter(".a" + aliens[i].iName).text("Hull = " + aliens[i].hull);
		$( "img" ).filter("." + aliens[i].iName).css("padding", aliens[i].hull);
		$( "img" ).filter("." + aliens[i].iName).css("background","white");
	}
	$( ".alien_pics" ).children().css("width", Math.floor(100/numAliens-1) + "%");  //this divides the pictures up with even space
//if (checked === true) {

//}		
	

	/*
	for (let i = 0; i < aliens.length; ++i) {
		aliens[i].setStats([random(3,6),random(2,4),random(0.6,0.8)]);
		//aliens[i].setStats([random(3,6),20,random(0.6,0.8)]);   //use this to test blowing up the defender
		$( "h5" ).filter(".a" + aliens[i].iName).text("Hull = " + aliens[i].hull);
		$( "img" ).filter("." + aliens[i].iName).css("padding", aliens[i].hull);
		$( "img" ).filter("." + aliens[i].iName).css("background","white");
	}
	*/
	//-------------------------------------------------------------------------------
	//Assign stats for the aliens
	//-------------------------------------------------------------------------------
	window.setTimeout(() =>{
		//$( "h2" ).eq(0).remove();
		$( "h2" ).eq(0).hide();
		$( ".flee" ).prop("disabled", false);    //this refers to .flee class
		$( ".instr" ).show()
		if (checked === false) {
			$( ".flee" ).css("left","40%");
			$( ".fight" ).prop("disabled", false);
			$( ".fight" ).show();
			$( ".instr" ).text("Push Fight button to randomly select an alien to attack or Flee button to flee. Check Hard Mode to battle in Hard mode")
		}
		else {
			$( ".fight" ).hide();
			$( ".flee" ).css("left","47%");
			$( ".instr" ).text("Push alien picture to select which one to destroy or Flee button to flee.  Deslect Hard Mode to play in Standard Mode")
		}
		
		//$('.startHere').hide();
		//interval = setInterval(blink_text, 1000);
		//choseInterval = setInterval(blink_text_chose, 1000);
		$( "h5" ).show("slow");
		$( "img" ).show("slow");
	},5000); 

	//-------------------------------------------------------------------------------
	//Create a single action class
	//-------------------------------------------------------------------------------
	globalAction = new action("who");

	//*******************************************************************************
	//Fight function  
	//*******************************************************************************

	$( ".whoWins" ).hide();


	$( ".alien_pics" ).children().click(function() {
	  	let x = $(this).index();
	 	//console.log(x);
	 	if (checked === true) {
	 		pickAlien(x);
	 		$( ".alien_pics" ).children().eq(x).remove();
	 	}
	});
}  //end of doGame

function pickAlien(x) {
	//console.log(x);
	let attacker = aliens.splice(x,1);
	//console.log(aliens)
	let justObj = attacker[0];
	attacker = justObj;
//-------------------------------------------------------------------------------
//Attack 1st alien ship
//-------------------------------------------------------------------------------
	globalAction.attack(earthDefender,attacker,aliens);
	//globalAction.attackSpecial(earthDefender,attacker);

//-------------------------------------------------------------------------------
//Fight is over.  Determine winner and act accordingly
//-------------------------------------------------------------------------------
	globalAction.afterFight(earthDefender,attacker);
	return 0;
}

		



$( ".fight" ).click(function() {
	let attacker = "";
	let justObj = "";
	let x = 0;

	clearInterval(interval);
	$( ".startHere" ).stop().hide();
	$( ".startHere" ).hide();
//-------------------------------------------------------------------------------
//Random alien is chosen to attack and splice it from the global aliens array
//-------------------------------------------------------------------------------
	if ( (aliens.length > 0) && (earthDefender.currentHull() > 0) ) {
		//console.log(aliens.length-1);
		x = random(0,(aliens.length - 1));
		attacker = aliens.splice(x,1);
		justObj = attacker[0];
		attacker = justObj;
		
		//console.log(attacker);
	
//-------------------------------------------------------------------------------
//Attack 1st alien ship
//-------------------------------------------------------------------------------
		globalAction.attack(earthDefender,attacker,aliens);
//-------------------------------------------------------------------------------
//Fight is over.  Determine winner and act accordingly
//-------------------------------------------------------------------------------
		globalAction.afterFight(earthDefender,attacker);
		$( ".alien_pics" ).children().eq(x).remove();
		
	} 
	return 0;
});


//*******************************************************************************
//Fleeing function  
//*******************************************************************************
$( ".flee" ).click(function() {
//-------------------------------------------------------------------------------
//Fleeing.  Stop the flashing text animations
//-------------------------------------------------------------------------------
	clearInterval(interval);
	$( ".startHere" ).stop().hide();
	//$( ".startHere" ).hide();
	clearInterval(choseInterval);  
	$( ".chose" ).stop().hide();
	//$( ".chose" ).hide();
//-------------------------------------------------------------------------------
//Fleeing.  Do animation to show the defender has fled and announce who won.
//-------------------------------------------------------------------------------
	$( "img" ).filter("." + earthDefender.iName).toggle( "pulsate" );
	//f = ".d" + earthDefender.iName;
	$( "h5" ).filter(".d" + earthDefender.iName).toggle( "pulsate" );
	$( ".whoWins" ).text("Defender Retreats.  Earth is Doomed!!!").show();
	earthDefender.setStats([0,0,0]);
//-------------------------------------------------------------------------------
//Disable the buttons
//-------------------------------------------------------------------------------
	$( ".flee" ).prop("disabled", true);    //this refers to .flee class
	$( ".fight" ).prop("disabled", true);
	$( ".alien_pics").children().unbind( "click" );
	$(".flee").hide();
	$( ".instr" ).text("Push Replay button to Start Over")

	return 0;
});




$( ".restart" ).click(function() {
	$( ".whoWins" ).hide();
	$( ".alien_pics" ).children().remove();
	$( "h2" ).eq(0).show();
	window.setTimeout(() =>{ doGame(); },1000); 
});

$( ".moo" ).on("change", (function() {
	$( ".whoWins" ).hide();
	$( ".alien_pics" ).children().remove();
	$( "h2" ).eq(0).show();
	//aliens = [];
	window.setTimeout(() =>{ doGame(); },1000);
	return 0; 
}));
doGame();
//$("#someElement").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


/*
let container = $('#container');
console.log(container);

let h1 = $('<h1></h1>');
h1.append("Test JS Link");
container.append(h1);
*/