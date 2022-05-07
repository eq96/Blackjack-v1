

function randomNum(max) {
    return Math.floor(Math.random() * max) + 2;
}

let firstCard = randomNum(10);
let secondCard = randomNum(10);
let sum = firstCard + secondCard;

let hasBlackJack = false;
let isAlive = true;
let message = ""

if (sum > 21) {
    message = `You hit ${sum}. You bust!`
    isAlive = false;
}
else if (sum === 21) {
    message = `You hit ${sum}. Blackjack! You Win!`
    hasBlackJack = true;
}
else {
    message = `You hit ${sum}. Hit or settle?`
}

if (hasBlackJack === true) {
    message = `Here are your winnings. Would you like to place another bet?`
} else if (isAlive === false) {
    message = `Press ENTER to play again!`
}

console.log(message)