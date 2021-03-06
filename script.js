/**Simple One-Way BlackJack Script - v1 - EQ
 * 
 * 
 */


let msg = document.getElementById("msg-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let houseSumEl = document.getElementById("houseSum-el");
let houseCardsEl = document.getElementById("houseCards-el");
let bet1 = document.getElementById("bet1-el");
let bet2 = document.getElementById("bet2-el");
let holdCardEl = document.getElementById("holdCard-el");
let newCardEl = document.getElementById("newCard-el")
let newGameEl = document.getElementById("newGame-el")
let winsEl = document.getElementById("wins-el")
let lossesEl = document.getElementById("losses-el")

//Money storage
let cashFromLocalStorage = JSON.parse(localStorage.getItem("pCash"))
let wins = JSON.parse(localStorage.getItem("pWins"))
let losses = JSON.parse(localStorage.getItem("pLosses"))

let pWins = 0;
let pLosses = 0;

let hasBlackJack = false;
let isAlive = false;

let message = "";

let cards = [];
let sum = 0;
let houseCards = [];
let houseSum = 0;

let bet = 0;


let player = {
    name: "player",
    cash: cashFromLocalStorage,
}

let house = {
    cash: 200,
}

const startConfetti = () => {
    setTimeout(function() {
        confetti.start()
    }, 100) 
};

const stopConfetti = () => {
    setTimeout(function() {
        confetti.stop()
    }, 100);
}

checkCash()
winsEl.textContent = `Wins: ${wins}`
lossesEl.textContent = `Losses: ${losses}`
playerEl.textContent = `${player.name}: $${player.cash}`
holdCardEl.hidden = true;
newCardEl.hidden = true;
hideBtn()

window.setInterval(function() {
    winsEl.textContent = `Wins: ${wins}`
    lossesEl.textContent = `Losses: ${losses}`
}, 1000);

bet1.addEventListener("click", () => {
    betGame();
    newCardEl.hidden = false;
    bet = 50;
});

bet2.addEventListener("click", () => {
    betGame();
    newCardEl.hidden = false;
    bet = 100;
});

function randomNum(max) {
    return Math.floor(Math.random() * max) + 2;
}

function newGame() {
    showBtn();
    clearMsg();
    stopConfetti();
    newGameEl.hidden = true;
    cardsEl.textContent = "Cards: "
    sumEl.textContent = "Sum: "
    houseCardsEl.textContent = "House Cards: "
    houseSumEl.textContent = "Sum: "
    localStorage.setItem("pCash", JSON.stringify(player.cash))
    localStorage.setItem("pWins", JSON.stringify(wins))
    localStorage.setItem("pLosses", JSON.stringify(losses))
}

function startGame() {
    let firstCard = randomNum(10)
    let secondCard = randomNum(10)
    let houseFirstCard = randomNum(10)
    let houseSecondCard = randomNum(10)
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    houseCards = [houseFirstCard, houseSecondCard]
    houseSum = houseFirstCard + houseSecondCard
    hasBlackJack = false;
    holdCardEl.hidden = false;
 
    if (isAlive === false) {
        isAlive = true;
        renderGame();
        hideBtn();
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

    houseCardsEl.textContent = "House Cards: "
    for (let i = 0; i < houseCards.length; i++) {
        houseCardsEl.textContent += houseCards[i] + " "
    }
    houseSumEl.textContent = `Sum: ${houseSum}`
    
    if (sum > 21) {
        message = `You bust!`
        isAlive = false;
        newGameEl.hidden = false;
        newCardEl.hidden = true;
        bet = 0;
        losses += 1;
    }
    else if (sum === 21) {
        message = `Blackjack! You Win!`
        hasBlackJack = true;
        isAlive = false;
        newGameEl.hidden = false;
        newCardEl.hidden = true;
        startConfetti();
        win();
        wins += 1;
    }
    else if (sum < 21 && houseSum > 21) {
        message = `You Win!`
        isAlive = false;
        win();
        newGameEl.hidden = false;
        newCardEl.hidden = true;
        startConfetti();
        wins += 1;
    }
    else if (houseSum === 21) {
        message = `You lose to the house!`
        isAlive = false;
        bet = 0;
        newGameEl.hidden = false;
        newCardEl.hidden = true;
        losses += 1;
    } else {
        return;
    }
    holdCardEl.hidden = true;
    newCardEl.hidden = true;
    msg.textContent = message;   
}

function newCard() {
    if(isAlive === true && hasBlackJack === false) {
        let card = randomNum(10);
        sum += card;
        cards.push(card);
        renderGame();
        houseCheck();
    }
}


/**
 * 
 * Element hide function
 */

function hideBtn() {
    bet1.hidden = true;
    bet2.hidden = true;
    return false;
}

function showBtn() {
    bet1.hidden = false;
    bet2.hidden = false;
}

/**
 * Logic checks for bet amount - removes amount that was bet
 */

function betGame() {
    if (bet === 50) {
        player.cash -= 50;
        cashFromLocalStorage -= player.cash
    //    bet = 0;
    } else if (bet === 100) {
        player.cash -= 100;
        cashFromLocalStorage -= player.cash
     //   bet = 0;
    }
    checkCash();
   playerEl.textContent = `${player.name}: $${player.cash}`
}

function checkCash() {
    if (player.cash >= 0) {
        playerEl.style.color = "greenyellow";
    } else if (player.cash < 0) {
        playerEl.style.color = "red";
    }
}

function win() {
    if (bet === 50) {
        bet = 0;
        player.cash += 100;
        cashFromLocalStorage += 100
    } else if (bet === 100) {
        bet = 0;
        player.cash += 200;

        cashFromLocalStorage += 200
    }
    wins += 1;
    playerEl.textContent = `${player.name}: $${player.cash}`
}

function houseCheck() {
    let card = randomNum(10);

    if(houseSum >= 1 && houseSum < 17) {
        houseSum += card;
        houseCards.push(card);
        houseCardsEl.textContent = "House Cards: "
        for (let i = 0; i < houseCards.length; i++) {
            houseCardsEl.textContent += houseCards[i] + " "
        }
        houseSumEl.textContent = `Sum: ${houseSum}`
    } else {
        return;
    }
}

function holdCard() {
    houseCheck()
    holdCardEl.hidden = true;
    newCardEl.hidden = true;

    if (bet === 50) {

        if (sum > houseSum && sum < 21) {
            bet = 0;
            player.cash += 100;
            cashFromLocalStorage += 100
            isAlive = false;
            newGameEl.hidden = false;
            message = 'You win $100!'
            startConfetti();
            wins += 1;
        } else if (sum < houseSum && sum < 21 && houseSum > 21) {
            bet = 0;
            player.cash += 100;
            cashFromLocalStorage += 100
            isAlive = false;
            newGameEl.hidden = false;
            message = 'You win $100!'
            startConfetti();
            wins += 1;
        } else if (houseSum > sum && houseSum < 21) {
            bet = 0;
            player.cash -= 100;
            cashFromLocalStorage -= 100
            isAlive = false;
            newGameEl.hidden = false;
            message = 'You LOSE $100!'
            losses += 1;
        } else if (houseSum === 21) {
            bet = 0;
            player.cash -= 100;
            cashFromLocalStorage -= 100
            isAlive = false;
            newGameEl.hidden = false;
            message = 'You LOSE $100!'
            losses += 1;
        } else {
            bet = 0;
            isAlive = false;
            newGameEl.hidden = false;
            message = 'DRAW!'
        }
        holdCardEl.hidden = true;
        newCardEl.hidden = true;
        playerEl.textContent = `${player.name}: $${player.cash}`
        msg.textContent = message; 

    } else if (bet === 100) {

        if (sum > houseSum && sum < 21) {
            bet = 0;
            player.cash += 200;
            cashFromLocalStorage += 200
            isAlive = false;
            newGameEl.hidden = false;
            message = 'You win $200!'
            startConfetti();
            wins += 1;
        } else if (sum < houseSum && sum < 21 && houseSum > 21) {
            bet = 0;
            player.cash += 200;
            cashFromLocalStorage += 200
            isAlive = false;
            newGameEl.hidden = false;
            message = 'You win $200!'
            startConfetti();
            wins += 1;
        } else if (houseSum > sum && houseSum < 21) {
            bet = 0;
            player.cash -= 200;
            cashFromLocalStorage -= 200
            isAlive = false;
            newGameEl.hidden = false;
            message = 'You LOSE $200!'
            losses += 1;
        } else if (houseSum === 21) {
            bet = 0;
            player.cash -= 200;
            cashFromLocalStorage -= 200
            isAlive = false;
            newGameEl.hidden = false;
            message = 'You LOSE $200!'
            losses += 1;
        } else {
            bet = 0;
            isAlive = false;
            newGameEl.hidden = false;
            message = 'DRAW!'
        }
        holdCardEl.hidden = true;
        newCardEl.hidden = true;
        playerEl.textContent = `${player.name}: $${player.cash}`
        msg.textContent = message; 

    } else {
        console.log("*******!!!!!!ERROR!!!!!!********")
    }
}

function clearMsg() {
    msg.textContent = ' ';
}