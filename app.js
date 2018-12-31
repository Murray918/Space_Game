function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}







let earthShip = {
    hull: 20,
    firePower: 5,
    accuracy: function() {
        let hit = Math.random()
        if (hit <= .7) {
            console.log('hit')
        } else {
            console.log('miss')
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

if(earthAttack.toLowerCase() === 'yes'){
	theAliensCome()
	console.log('Earth is under attack its your move')
} else{
	console.log('the earth is destroyed')
}

let $console = $('.console')

$console.append("<button id='attack'>Attack</button> <button id='retreat'>Retreat</button>")

$console.click(earthShip.accuracy)


