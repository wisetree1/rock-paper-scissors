'use strict';

const shapes = ['Scissors', 'Paper', 'Rock'];

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function getHumanChoice(shape) {
    let choice;
    switch (shape.toLowerCase()) {
        case 'scissors':
            choice = 0;
            break;
        case 'paper':
            choice = 1;
            break;
        default:
            choice = 2;
    }
    
    return choice;
}

function playRound(computerChoice, humanChoice) {
    let resultMessage;
    let result;
    if (computerChoice == humanChoice) {
        resultMessage = `Draw! ${shapes[humanChoice]} [h] and ${shapes[computerChoice]} [c].`;
        result = 0;

        computerButtons[computerChoice].style.backgroundColor = 'orange';
    } else if ((computerChoice + 1) % 3 == humanChoice) {
        resultMessage = `Lose! ${shapes[computerChoice]} [c] beats ${shapes[humanChoice]} [h].`; 
        result = 1;

        computerButtons[computerChoice].style.backgroundColor = 'red';
    } else {
        resultMessage = `Win! ${shapes[humanChoice]} [h] beats ${shapes[computerChoice]} [c].`;
        result = 2;
        
        computerButtons[computerChoice].style.backgroundColor = 'green';
    }

    console.log(computerChoice);

    return {
        'message': resultMessage,
        'result': result,
    };
}

function applyResult(resultObj) {
    switch (resultObj.result) {
        case 0:
            humanScore++;
            computerScore++;
            break;
        case 1:
            computerScore++;
            break;
        default:
            humanScore++;
    }

    announcementH.textContent = resultObj.message;
    if (Math.max(computerScore, humanScore) == 5) {
        let gameEndMessage;
        let restartGameMessage = 'Select a shape to start again!';
        if (humanScore > computerScore) {
            gameEndMessage = "Congratulations! You win!";
        } else if (humanScore < computerScore) {
            gameEndMessage = "Shame! You lost!";
        } else {
            gameEndMessage = "Amazing! It's a draw!";
        }

        isGameFinished = true;

        announcementH.setAttribute('style', 'white-space: pre;');
        announcementH.textContent += `\r\n${gameEndMessage}\r\n${restartGameMessage}`;
    }

    score.textContent = `${humanScore} - ${computerScore}`;
}

function restartGame() {
    humanScore = 0;
    computerScore = 0;

    isGameFinished = false;
}

function playGame(numOfRounds = 5) {
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i < numOfRounds; i++) {
        console.log(`The current score is ${humanScore} [h] - ${computerScore} [c].`);
        let computerChoice = getComputerChoice();
        let humanChoice = getHumanChoice();
    
        let result = playRound(computerChoice, humanChoice);
        switch (result) {
            case 0:
                humanScore++;
                computerScore++;
                break;
            case 1:
                computerScore++;
                break;
            default:
                humanScore++;
        }
    }

    if (humanScore > computerScore) {
        console.log("Congratulations! You win!");        
    } else if (humanScore < computerScore) {
        console.log("Shame! You lost!");
    } else {
        console.log("Amazing! It's a draw!");
    }

    console.log(`The final score is ${humanScore} [h] - ${computerScore} [c].`);
}

let humanScore = 0;
let computerScore = 0;

let isGameFinished = false;

const announcementH = document.body.querySelector('.announcement');
const score = document.body.querySelector('.score');

const computerChoiceArea = document.body.querySelector('.computer-choice');
const computerButtons = [computerChoiceArea.querySelector('.scissors'), computerChoiceArea.querySelector('.paper'), computerChoiceArea.querySelector('.rock')];
computerButtons.forEach((item) => {
    item.style.backgroundColor = 'buttonface';
});
function clearComputerButtonsBackgroundColor() {
    computerButtons.forEach((item) => {
        item.style.backgroundColor = 'buttonface';
    });
}

const humanChoiceArea = document.body.querySelector('.human-choice');
humanChoiceArea.addEventListener('click', (e) => {
    console.log(e);
    if (e.target.nodeName != 'BUTTON') {
        return;
    }

    console.log(isGameFinished);
    if (isGameFinished) {
        restartGame();
    }
    console.log(score.textContent);

    const computerChoice = getComputerChoice();
    const humanChoice = getHumanChoice(e.target.textContent);

    clearComputerButtonsBackgroundColor();

    const resultObj = playRound(computerChoice, humanChoice);
    applyResult(resultObj);
});

