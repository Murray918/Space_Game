//*******************************************************************
//Class resposible for constructing ship objects
class Ship {
	constructor(shipName, hull, firepower, accuracy, shipCount, img) {
		this.shipName = shipName;
		this.hull = hull;
		this.firepower = firepower;
		this.accuracy = accuracy;
		this.shipCounter = shipCount;
		this.img = img;
	}
	stillAlive() {
		if (this.hull > 0) return true;
	}
	attack(target) {
		if (
			Math.round((Math.random() * 0.9 + 0.1) * 10) / 10 >
			1 - this.accuracy
		) {
			if (target.hull < this.firepower) target.hull = 0;
			else target.hull -= this.firepower;
		} else {
		}
	}
}
//*******************************************************************

//*******************************************************************
//Data resposible for holding all players, npcs, users choices and
//counters for the amount of aliens left
//and Bosses weapon pods left
let bossPods = [];
let alienBoss = null;
let USS_Assembly = null;
let alienShips = [];
let shipCount = 1;
let chooseShip = 0;
let podCounter = 0;
const numberOfBossPods = 4;
//*******************************************************************

//*******************************************************************
//function to populate the battle with a random amount of aliens,
//one player and a boss
function populateBattle() {
	USS_Assembly = new Ship(
		'USS_Assembly',
		20,
		5,
		0.7,
		0,
		'./images/heroShip.png'
	);
	alienBoss = new Ship('Alien Boss', 20, 6, 0.7, 0, './images/alienShip.jpg');
	USS_Assembly.shields = Math.floor(Math.random() * 6 + 5);
	USS_Assembly.missles = 3;
	let randomAliens = Math.floor(Math.random() * 4 + 6);
	//create a random number of aliens
	for (let i = 0; i < randomAliens; i++) {
		alienShips.push(
			new Ship(
				'Alien Ship ' + (i + 1),
				Math.floor(Math.random() * 4 + 3),
				Math.floor(Math.random() * 3 + 2),
				Math.round((Math.random() * 0.3 + 0.6) * 10) / 10,
				i + 1,
				'./images/alienShip.jpg'
			)
		);
	}
	for (let i = 0; i < numberOfBossPods; i++) {
		bossPods.push(
			new Ship(`Weapon Pod`, 5, 3, 0.5, i + 1, './images/alienShip.jpg')
		);
	}
	podCounter = bossPods.length;
	$('#playerUIContainer').prepend(
		`<img src="${USS_Assembly.img}" class="heroShip">`
	);
	//click functions for alien ships
	for (let ship of alienShips) {
		$('#enemyContainer').append(
			`<img src="${ship.img}" class="alienShip alienShip${shipCount}">`
		);

		$(`.alienShip${shipCount}`).click(function() {
			chooseShip = ship.shipCounter;
			$('.alienShip').css({ border: 'none' });
			$(this).css({ border: 'solid white' });
		});
		$(`.alienShip${shipCount}`).mouseenter(function() {
			$('#enemyStatsContainer').show().append(`<ul>
													   <li>${ship.shipName}</li>
													   <li>Hull Integrity: ${ship.hull}</li>
													   <li>Damage: ${ship.firepower}</li>
													   <li>Accuracy: ${ship.accuracy}</li>
													 </ul>`);
		});
		$(`.alienShip${shipCount}`).mouseleave(function() {
			$('#enemyStatsContainer')
				.hide()
				.empty();
		});
		shipCount++;
	}
	shipCount--;
}
//*******************************************************************

//*******************************************************************
//Data resposble for using missles and to check weather the player
//has encountered the boss yet
//Much of this code can be refactored into functions
let missleChoice = false;
let bossEncounter = false;
function shipBattle(shipChoice) {
	shipChoice--;
	//continue to attack while both ships are still alive
	while (USS_Assembly.stillAlive() && alienShips[shipChoice].stillAlive()) {
		let oldPower = USS_Assembly.firepower;
		if (missleChoice && USS_Assembly.missles > 0) {
			USS_Assembly.firepower = 10;
			USS_Assembly.missles--;
			missleChoice = false;
		}
		USS_Assembly.attack(alienShips[shipChoice]);
		USS_Assembly.firepower = oldPower;
		if (alienShips[shipChoice].stillAlive()) {
			let attackAfterShield = 0;
			let oldFirePower = alienShips[shipChoice].firepower;
			//logic for players shields
			if (USS_Assembly.shields < alienShips[shipChoice].firepower) {
				attackAfterShield =
					alienShips[shipChoice].firepower - USS_Assembly.shields;
			}
			alienShips[shipChoice].firepower = attackAfterShield;
			alienShips[shipChoice].attack(USS_Assembly);
			alienShips[shipChoice].firepower = oldFirePower;
			if (USS_Assembly.shields > 0) {
				USS_Assembly.shields -= oldFirePower;
			} else {
				USS_Assembly.shields = 0;
			}
		} else {
			$(`.alienShip${shipChoice + 1}`).fadeOut();
			shipCount--;
		}
		refreshStats();
	}
	//Encounter the boss as long as you havent encountered a boss
	//yet and all the previous ships have died
	if (shipCount <= 0 && !bossEncounter) {
		shipChoice = 0;
		bossEncounter = true;
		alienShips = [];
		for (let i = 0; i < numberOfBossPods; i++) {
			alienShips.push(bossPods[i]);
		}
		alienShips.push(alienBoss);
		for (let i = 0; i < numberOfBossPods; i++) {
			$('#enemyContainer').append(
				`<img src=${
					bossPods[i].img
				} class="alienShip bossPod${i}"></img>`
			);
			if (i == Math.floor(numberOfBossPods / 2 - 1))
				$('#enemyContainer').append(
					`<img src=${alienBoss.img} class="alienBoss"></img>`
				);
		}
		for (let i = 0; i <= bossPods.length; i++) {
			$(`.bossPod${i}`).click(function() {
				chooseShip = i;
				$('.alienShip').css({ border: 'none' });
				$(this).css({ border: 'solid white' });
			});
		}
		//Click functions for boss
		$(`.alienBoss`).click(function() {
			if (podCounter <= 0) {
				chooseShip = 5;
				$('.alienBoss').css({ border: 'none' });
				$(this).css({ border: 'solid white' });
			}
		});
		$(`.alienBoss`).mouseenter(function() {
			$('#enemyStatsContainer').show().append(`<ul>
														   <li>${alienBoss.shipName}</li>
														   <li>Hull Integrity: ${alienBoss.hull}</li>
														   <li>Damage: ${alienBoss.firepower}</li>
														   <li>Accuracy: ${alienBoss.accuracy}</li>
														 </ul>`);
		});
		$(`.alienBoss`).mouseleave(function() {
			$('#enemyStatsContainer')
				.hide()
				.empty();
		});
	}
	//Animations
	if (!USS_Assembly.stillAlive()) {
		$('.heroShip').fadeOut();
		$('.gameOverContainer').show();
	} else if (!alienBoss.stillAlive()) {
		$('.alienBoss').fadeOut();
		$('.enemyDeathContainer').show();
	} else if (
		bossEncounter &&
		podCounter >= 1 &&
		!bossPods[shipChoice].stillAlive()
	) {
		podCounter--;
		$(`.bossPod${chooseShip}`).fadeOut();
	}
}
//Function to re-post the players current stats to the "player stats" window
function refreshStats() {
	$('.playerStats').empty();
	$('.playerStats').append(`<p>${USS_Assembly.shipName}</p>
							  <p>Hull Integrity: ${USS_Assembly.hull} Shields: ${USS_Assembly.shields}</p>
							  <p>Damage: ${USS_Assembly.firepower} Accuracy: ${USS_Assembly.accuracy}</p>
							  <p>Missles: ${USS_Assembly.missles}</p>`);
}
//*******************************************************************

//*******************************************************************
//Reset button function
//resets all data to default values
$('.reset').click(function() {
	bossEncounter = false;
	USS_Assembly = null;
	alienShips = [];
	shipCount = 1;
	chooseShip = 0;
	bossPods = [];
	$('.gameContainer').show();
	$('.heroShip').remove();
	$('.enemyDeathContainer').hide();
	$('.gameOverContainer').hide();
	$('#enemyContainer').empty();
	populateBattle();
	refreshStats();
});
//*******************************************************************

//*******************************************************************
//Retreat Button not functioning properly
//Retreat button
// $("#retreat").click(function() {
// 	$(".gameContainer").hide()
// 	$(".gameOverContainer").show()
// })
//*******************************************************************

//*******************************************************************
//function calls and button clicks
populateBattle();
refreshStats();
$('#missles').click(function() {
	missleChoice = true;
});
$('#attack').click(function() {
	shipBattle(chooseShip);
});
//*******************************************************************

//*******************************************************************
//Hide containers
$('#enemyStatsContainer').hide();
$('.enemyDeathContainer').hide();
$('.gameOverContainer').hide();
//*******************************************************************
