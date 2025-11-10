'use strict';

const codeToShape = {
    0: 'Scissors',
    1: 'Paper',
    2: 'Rock',
}

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function getHumanChoice() {
    let input = prompt('Please choose a shape between: \n- Rock\n- Paper\n- Scissors');

    let choice;
    switch (input.toLowerCase()) {
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
        resultMessage = `Draw! ${codeToShape[humanChoice]} [h] and ${codeToShape[computerChoice]} [c].`;
        result = 0;
    } else if ((computerChoice + 1) % 3 == humanChoice) {
        resultMessage = `Lose! ${codeToShape[computerChoice]} [c] beats ${codeToShape[humanChoice]} [h].`; 
        result = 1;
    } else {
        resultMessage = `Win! ${codeToShape[humanChoice]} [h] beats ${codeToShape[computerChoice]} [c].`;
        result = 2;
    }

    console.log(resultMessage);
    return result;
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

playGame();