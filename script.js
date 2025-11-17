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
        resultMessage = `Draw! ${shapes[humanChoice]} and ${shapes[computerChoice]}.`;
        result = 0;

        computerButtons[computerChoice].style.backgroundColor = blueColor;
        humanButtons[humanChoice].style.backgroundColor = blueColor;
    } else if ((computerChoice + 1) % 3 == humanChoice) {
        resultMessage = `Lose! ${shapes[humanChoice]} is beaten by ${shapes[computerChoice]}.`;
        result = 1;

        humanButtons[humanChoice].style.backgroundColor = redColor;
        computerButtons[computerChoice].style.backgroundColor = greenColor;
    } else {
        resultMessage = `Win! ${shapes[humanChoice]} beats ${shapes[computerChoice]}.`;
        result = 2;
        
        humanButtons[humanChoice].style.backgroundColor = greenColor;
        computerButtons[computerChoice].style.backgroundColor = redColor;
    }

    return {
        'message': resultMessage,
        'result': result,
    };
}

function applyResult(resultObj) {
    switch (resultObj.result) {
        case 0:
            break;
        case 1:
            computerScore++;
            break;
        default:
            humanScore++;
    }

    addRoundLogs(resultObj.message);

    announcementH.textContent = resultObj.message;
    if (Math.max(computerScore, humanScore) == 5) {
        let gameEndMessage;
        let restartGameMessage = 'Select a shape to start again!';
        if (humanScore > computerScore) {
            gameEndMessage = "Congratulations! You won the game!";
        } else if (humanScore < computerScore) {
            gameEndMessage = "Shame! You lost the game!";
        } else {
            gameEndMessage = "Amazing! It's a draw! (Secret ending!)";
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
    roundCount = 0;
    
    clearRoundLogs();
 
    isGameFinished = false;
}

const redColor = 'rgb(178, 61, 61)';
const blueColor = 'rgba(48, 36, 126, 1)';
const greenColor = 'rgba(48, 119, 48, 1)';

let humanScore = 0;
let computerScore = 0;
let isGameFinished = false;

const announcementH = document.body.querySelector('.announcement');
const score = document.body.querySelector('.score');

const computerChoiceArea = document.body.querySelector('.computer-choice');
const computerButtons = [computerChoiceArea.querySelector('.scissors'), computerChoiceArea.querySelector('.paper'), computerChoiceArea.querySelector('.rock')];

const humanChoiceArea = document.body.querySelector('.human-choice');
const humanButtons = [humanChoiceArea.querySelector('.scissors'), humanChoiceArea.querySelector('.paper'), humanChoiceArea.querySelector('.rock')];
function clearChoiceButtonsBackgroundColor(buttons) {
    buttons.forEach((item) => {
        item.style.backgroundColor = '#1e9f9781';
    });
}

humanChoiceArea.addEventListener('click', (e) => {
    console.log(e);
    if (e.target.nodeName != 'BUTTON' && e.target.parentElement.nodeName != 'BUTTON') {
        return;
    }

    if (isGameFinished) {
        restartGame();
    }
    
    const computerChoice = getComputerChoice();

    let shape = e.target.nodeName == 'BUTTON'? e.target.className : e.target.parentElement.className;
    const humanChoice = getHumanChoice(shape);

    clearChoiceButtonsBackgroundColor(computerButtons);
    clearChoiceButtonsBackgroundColor(humanButtons);

    const resultObj = playRound(computerChoice, humanChoice);
    applyResult(resultObj);
});

const roundLogs = document.body.querySelector('.round-logs');
let roundCount = 0;
function addRoundLogs(logsText) {
    const p = document.createElement('p');
    p.textContent = `Round ${++roundCount}: ${logsText} Score: ${humanScore} - ${computerScore}.`;

    roundLogs.appendChild(p);
};
function clearRoundLogs() {
    while (roundLogs.firstChild) {
        roundLogs.removeChild(roundLogs.lastChild);
    }
}
