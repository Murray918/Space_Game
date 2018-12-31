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


let turn = []
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

if(earthAttack.toLowerCase() === 'yes'){
	theAliensCome()
	console.log('Earth is under attack its your move')
} else if(earthAttack != 'yes'){
	console.log('the earth is destroyed')
    $('html').hide()
}


let attackPhaseHuman = function(){
    if(earthShip.accuracy() === 'hit'){
        alienFleet[0].hull -= earthShip.firePower
        console.log('you hit')
        if(alienFleet[0].hull <=0){
            console.log('defeated alien')
            alienFleet.shift()
            console.log(alienFleet.length + 'remaining ships')
        }
    } else{
        console.log('miss')
    }
}
let gameOver = function(){
    $('body').hide()
    $('html').append('<body><h1> YOU LOSE</h1></body>')
}

let $console = $('.console')

$console.append("<button id='attack'>Attack</button> <button id='retreat'>Retreat</button>")

$('#attack').click(attackPhaseHuman)
$('#retreat').click(gameOver)






