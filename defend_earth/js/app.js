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
		while (attacker.hull > 0 && defender.hull > 0) {
			x = Math.random();
			if (x <= defender.accruacy) {
				attacker.hull = attacker.hull - defender.firepower;
			}
			else
			{
				console.log("Defender Missed " + x);
			}
			//do stuff here
			console.log("attacker hull = " + attacker.hull);

			if (attacker.hull > 0) 
			{
				x = Math.random();
				if (x <= attacker.accruacy ) 
				{
					defender.hull = defender.hull - attacker.firepower;
				//console.log("defender hull = " + defender.hull);
				}
				else
				{
					console.log("Attacker Missed " + x);
				}
			}
			else 
			{
				console.log("attack phase " + i + " over.  Attacker Loses hull = " + attacker.hull + " Defender Wins hull = " + defender.hull);
				break;
			}
			console.log("attack phase " + i + " over.  Attacker hull = " + attacker.hull + " Defender hull = " + defender.hull);
			i++;
		}
		return 0;
	}
}

//-------------------------------------------------------------------------------
//Create a random function that will return a value between the min and max
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
//Create the Defender and alien attackers
//-------------------------------------------------------------------------------
let earthDefender = new shipStats("Master");
earthDefender.setStats([20,5,0.7]);

//Place the 6 alien attackers into an array
let aliens = [new shipStats("Bad1"), new shipStats("Bad2"),new shipStats("Bad3"), new shipStats("Bad4"),new shipStats("Bad5"),new shipStats("Bad6")];
for (let i = 0; i < 6; ++i) {
	aliens[i].setStats([random(3,6),random(2,4),random(0.6,0.8)]);
}


//-------------------------------------------------------------------------------
//pick an alien to attack and slice it from the global aliens array
//-------------------------------------------------------------------------------

let attacker = aliens.splice(random(0,(aliens.length - 1),1));
let justObj = attacker[0];
attacker = justObj;
console.log(attacker);


//-------------------------------------------------------------------------------
//Create a single action class
//-------------------------------------------------------------------------------
let globalAction = new action("who");

console.log("Hull = " + earthDefender.currentHull());
console.log("Hull = " + attacker.currentHull());

//-------------------------------------------------------------------------------
//Attack 1st alien ship
//-------------------------------------------------------------------------------
globalAction.attack(earthDefender,attacker);










/*
let container = $('#container');
console.log(container);

let h1 = $('<h1></h1>');
h1.append("Test JS Link");
container.append(h1);
*/