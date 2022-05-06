

function randomNum(max) {
    return Math.floor(Math.random() * max) + 2;
}

let firstCard = randomNum(10);
let secondCard = randomNum(10);
let sum = firstCard + secondCard;
console.log(sum);