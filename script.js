let numberRandom = Math.floor(Math.random() * 100) + 1;
// generates a random number

const guesses = document.querySelector('.guesses')  
    , lastGuess = document.querySelector('.lastGuess')
    , lowHigh = document.querySelector('.lowHigh')
//The first three constants are each made to store a reference to the results paragraphs in our HTML, and are used to insert values into the paragraphs later on in the code
    
    , guessSubmit = document.querySelector('.guessSubmit')
    , guessField = document.querySelector('.guessField');
// The last two constants store references to the form text input and submit button and are used to control submitting the guess

let guessCount = 1 
  , resetButton;
// Our final two variables store a guess count of 1, and a reference to a reset button

function guessCheck() {
    let userGuess = +guessField.value; //longer variant 'Number(guessField.value)'
// Checking if imput its a number
    
    if (guessCount === 1) {
        guesses.textContent = 'Previous Guesses: ';
    }
    guesses.textContent += userGuess + ' ';
    
    if (userGuess === numberRandom) {
        lastGuess.textContent = 'Congratulations!!! You got it right!!!';
        lastGuess.style.background = 'green';
        lastGuess.style.color = 'white';
        lowHigh.textContent = '';
        setGameOver();
// checks if user's gues is equal to the numberRandom. If it is, the player has guessed correctly and he won, so we show the player a congratulations message with a green color,
    }   else if (guessCount === 10) {
        lastGuess.textContent = '!>:~GAME OVER~:<!';
        lastGuess.style.background = 'red';
        lowHigh.textContent = '';
        setGameOver();
// This one checks whether this turn is the user's last turn. If it is, the program does the same thing as in the previous block, except with a game over message 
    }   else {
        lastGuess.textContent = 'Wrong!';
        lastGuess.style.background = 'red';
        if (userGuess < numberRandom) {
            lowHigh.textContent = 'Ur last gess was too Low!';
        }   else if (userGuess > numberRandom) {
            lowHigh.textContent = 'Ur last gess was too High!';
// In this case we tell them they are wrong, then we perform another conditional test to check whether the guess was higher or lower than the answer, displaying a further message as appropriate to tell them higher or lower.
        }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
// get us ready for the next guess to be submitted. We add 1 to the guessCount variable so the player uses up their turn, and empty the value out of the form text field and focus it again, ready for the next guess to be entered.
}

guessSubmit.addEventListener('click', guessCheck);
guessSubmit.addEventListener('keypress', (e) => if (e.key === 'Enter') guessCheck);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
// disable the form text input and button by setting their disabled properties to true
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start a New Game';
    document.body.appendChild(resetButton);
// generate a new <button> element, and add it to the bottom
    resetButton.addEventListener('click', resetGame);
}

function resetGame() { // completely resets everything to how it was at the start of the game, so the player can have another go.

    guessCount = 1;
    
    const resetDisplay = document.querySelectorAll('.resultDisplay p');
    for (let i = 0 ; i < resetDisplay.length ; i++) {
        resetDisplay[i].textContent = '';
    }
    
    resetButton.parentNode.removeChild(resetButton);
    
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastGuess.style.background = 'white';    
    
    numberRandom = Math.floor(Math.random() * 100) + 1;
}
