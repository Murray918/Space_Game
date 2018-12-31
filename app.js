function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}







let earthShip = {
    hull: 20,
    firePower: 5,
    accuracy: function() {
        let hit = Math.random()
        if (hit <= .7) {
            return 'hit'
        } else {
            return 'miss'
        }
    }

}


let alienAccuracy = function() {
    let int = random(.6, .8)
    let hit = Math.random()
    if (hit <= int) {
        return 'hit'
    } else {
        return 'miss'
    }


}

class alienShip {
    constructor() {
        this.hull = random(3, 6)
        this.firePower = random(2, 4)
        this.accuracy = alienAccuracy

    }

}



let alienFleet = []
let theAliensCome = function() {
    alienFleet.push(new alienShip)
    alienFleet.push(new alienShip)
    alienFleet.push(new alienShip)
    alienFleet.push(new alienShip)
    alienFleet.push(new alienShip)
    alienFleet.push(new alienShip)
}


let earthAttack = prompt('Do you wish to do battle? \n if so type yes')
if (earthAttack.toLowerCase() === 'yes') {
    theAliensCome()
    console.log('Earth is under attack its your move, \n There are 6 alien ships you have the first attack')
} else if (earthAttack != 'yes') {
    console.log('the earth is destroyed')
    $('html').hide()
} 







let attackPhaseHuman = function() {
    if (alienFleet.length != 0) {
        if (earthShip.accuracy() === 'hit') {
            alienFleet[0].hull -= earthShip.firePower
            console.log('you hit')
            if (alienFleet[0].hull <= 0) { //if you kill the ship you get to attack first again
                console.log('defeated alien')
                alienFleet.shift()
                console.log(alienFleet.length + ' remaining ships')
                let nextRound = prompt('Do you wish to continue?') //currently to show win screen you need to attack when there is no more alien ships left
                if (nextRound.toLowerCase() != 'yes') {
                    gameOver()
                }
            } else { //aliens attack at the end of each phase

                attackPhaseAlien()
            }

        } else { //aliens attack at the end of each phase
            console.log('miss')
            attackPhaseAlien()
        }
    } else {
        gameOver()
    }
}

let attackPhaseAlien = function() {
    if (alienFleet[0].accuracy() === 'hit') {
        earthShip.hull -= alienFleet[0].firePower
        console.log("you've been hit, hull strength down to " + earthShip.hull)
        if (earthShip.hull <= 0) {
            gameOver()
        }
    } else {
        console.log('There Lasers missed you')
    }
}

let gameOver = function() {
    if (alienFleet.length === 0) {
        $('body').hide()
        $('html').append('<body><h1> YOU WIN</h1></body>')
    } else {
        $('body').hide()
        $('html').append('<body><h1> YOU LOSE</h1></body>')
    }
}


let $console = $('.console')

$console.append("<button id='attack'>Attack</button> <button id='retreat'>Retreat</button>")

$('#attack').click(attackPhaseHuman)
$('#retreat').click(gameOver)