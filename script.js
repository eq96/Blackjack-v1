

function randomNum(max) {
    return Math.floor(Math.random() * max) + 2;
}

let firstCard = randomNum(10);
let secondCard = randomNum(10);
let sum = firstCard + secondCard;

if (sum > 21) {
    console.log(`You hit ${sum}. You bust!`)
}
else if (sum === 21) {
    console.log(`You hit ${sum}. Blackjack! You Win!`)
}
else if (sum < 21) {
    console.log(`You hit ${sum}. Hit or settle?`)
}