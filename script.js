/**Simple One-Way BlackJack Script - v1 - EQ
 * 
 * 
 */


let msg = document.getElementById("msg-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");


let hasBlackJack = false;
let isAlive = false;

let message = "";

let cards = [];
let sum = 0;

let player = {
    name: "eddy",
    cash: 200,
    win: function() {
        player.cash += 50;
        playerEl.textContent = `${player.name}: $${player.cash}`
    }
}

function randomNum(max) {
    return Math.floor(Math.random() * max) + 2;
}


function startGame() {
    hasBlackJack = false;
    let firstCard = randomNum(10)
    let secondCard = randomNum(10)
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    if (isAlive === false) {
        isAlive = true;
        renderGame();
    } else {
        msg.textContent = "You already started a game! Hint: Press 'New Card'"
    }
}    

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = `Sum: ${sum}`
    if (sum > 21) {
        message = `You bust!`
        isAlive = false;
    }
    else if (sum === 21) {
        message = `Blackjack! You Win!`
        hasBlackJack = true;
        isAlive = false;
        player.win()
    }
    else {
        message = `Hit or settle?`
    }
    
    msg.textContent = message;
}

function newCard() {
    if(isAlive === true && hasBlackJack === false) {
        let card = randomNum(10);
        sum += card;
        cards.push(card);
        renderGame();
    }
}