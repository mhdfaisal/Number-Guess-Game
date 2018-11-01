//Game variables
let min = 1,
      max = 10,
      winningNumber=2,
      noGuessLeft=3;

//UI Elements
const game = document.querySelector("#game");
const UImin = document.querySelector("#min");
const UImax = document.querySelector("#max");
const guessInput = document.querySelector("#guess-input");
const guessBtn = document.querySelector("#guess-btn");
const message = document.querySelector("#message");

//Setting UImin and UImax
UImax.textContent = max;
UImin.textContent= min;

//Event Listener for the play again button

/* We will Use Event Delegation, since the play-again class is added to the button dynamically .
   Using mousedown event instead of click, since it will be better when applying on the same button.
*/
game.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('play-again')){
        //Reload The window
        window.location.reload();
    }
});

//Adding Submit Event Listener
guessBtn.addEventListener('click', function(e){

    let num = parseInt(guessInput.value);
   //Validate Input
    let check = validateInput(num);
    //If check is successful (true)
    if(check){
        if(num === winningNumber){
            gameOver(`You Won, ${winningNumber} is the correct answer`,'green');
        }
        else{
            noGuessLeft -= 1;
            if(noGuessLeft===0){
                gameOver(`Game Over, you lost. The correct number was ${winningNumber}`,'red');
            }
            else{
                let s = '';
                //Making the sentence singular or plural
                s = isPlural(num);
                setMessage(`${num} is wrong, ${noGuessLeft} guess${s} left`,'red');
            }
        }
    }
    e.preventDefault();
});

//Function to validate Inputs -
function validateInput(num){
    if(isNaN(num) || num > max || num < min){
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
        return false;
    }
    else 
        return true;
}

//Set Message Function
function setMessage(msg, color){
    message.style.color=color;
    message.textContent=msg;
    guessInput.style.borderColor=color;
}

//Game Over Function
function gameOver(msg, color){
    setMessage(msg,color);
    guessInput.disabled=true;
    guessBtn.classList.add('play-again');
    guessBtn.textContent="Play Again";
}

//Making sentence singular or plural
function isPlural(num){
    let s = '';
    if(noGuessLeft > 1){
        s='es';
    }
    else{
        s='';
    }
    return s;
}