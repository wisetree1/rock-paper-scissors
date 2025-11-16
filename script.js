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
        humanButtons[humanChoice].style.backgroundColor = 'orange';
    } else if ((computerChoice + 1) % 3 == humanChoice) {
        resultMessage = `Lose! ${shapes[computerChoice]} [c] beats ${shapes[humanChoice]} [h].`; 
        result = 1;

        humanButtons[humanChoice].style.backgroundColor = 'red';
        computerButtons[computerChoice].style.backgroundColor = 'green';
    } else {
        resultMessage = `Win! ${shapes[humanChoice]} [h] beats ${shapes[computerChoice]} [c].`;
        result = 2;
        
        humanButtons[humanChoice].style.backgroundColor = 'green';
        computerButtons[computerChoice].style.backgroundColor = 'red';
    }

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

    isGameFinished = false;
}

let humanScore = 0;
let computerScore = 0;

let isGameFinished = false;

const announcementH = document.body.querySelector('.announcement');
const score = document.body.querySelector('.score');

const computerChoiceArea = document.body.querySelector('.computer-choice');
const computerButtons = [computerChoiceArea.querySelector('.scissors'), computerChoiceArea.querySelector('.paper'), computerChoiceArea.querySelector('.rock')];

const humanChoiceArea = document.body.querySelector('.human-choice');
const humanButtons = [humanChoiceArea.querySelector('.scissors'), humanChoiceArea.querySelector('.paper'), humanChoiceArea.querySelector('.rock')];
const clearChoiceButtonsBackgroundColor = (buttons) => {
    buttons.forEach((item) => {
        item.style.backgroundColor = 'buttonface';
    });
}

humanChoiceArea.addEventListener('click', (e) => {
    if (e.target.nodeName != 'BUTTON') {
        return;
    }

    if (isGameFinished) {
        restartGame();
    }

    const computerChoice = getComputerChoice();
    const humanChoice = getHumanChoice(e.target.textContent);

    clearChoiceButtonsBackgroundColor(computerButtons);
    clearChoiceButtonsBackgroundColor(humanButtons);

    const resultObj = playRound(computerChoice, humanChoice);
    applyResult(resultObj);
});
