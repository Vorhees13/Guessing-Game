const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let secretNumber;
let numAttempts = 5;

function checkGuess(num) {
    if (num > secretNumber) {
        console.log("Too high.");
        return false;
    } else if (num < secretNumber) {
        console.log("Too low.");
        return false;
    } else if (num === secretNumber) {
        console.log("Correct!");
        return true;
    }
}

function askGuess() {
    if (numAttempts === 0) {
        console.log("You Lose!");
        rl.close();
        return;
    }

    rl.question("Enter a guess: ", (guess) => {
        const num = parseInt(guess);
        const result = checkGuess(num);
        numAttempts--;
        if (!result) {
            console.log(`You have ${numAttempts} attempts left.`);
            askGuess();
        } else {
            rl.close();
        }
    });
}

function askRange() {
    rl.question("Enter a minimum number: ", (min) => {
        const minNum = parseInt(min);
        rl.question("Enter a maximum number: ", (max) => {
            const maxNum = parseInt(max);
            secretNumber = randomInRange(minNum, maxNum);
            console.log(`I'm thinking of a number between ${minNum} and ${maxNum}...`);
            askGuess();
        });
    });
}

askRange();