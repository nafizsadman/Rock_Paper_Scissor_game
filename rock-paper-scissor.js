function resetBtn() {
    score.win = 0,
    score.lose = 0,
    score.tie = 0
    reloadScore();
    localStorage.removeItem('score');
    pickRockHand();
    document.querySelector('.js-computer-pick').innerHTML = `<i class="fa-solid fa-hand-back-fist"></i>`;
    
}
const score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    lose: 0,
    tie: 0
};
let isAutoPlay = false;
let intervalId;
function autoPaly() {
    if (!isAutoPlay) {
        intervalId = setInterval( function() {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000)
        isAutoPlay = true; 
    } else {
        clearInterval(intervalId);
        isAutoPlay = false;
    } 
        const autoPlayBtnElement = document.querySelector('.js-auto-paly-button');
        if (autoPlayBtnElement.innerHTML === 'Auto Play') {
            autoPlayBtnElement.innerHTML = `Play off`;
            autoPlayBtnElement.classList.add('js-auto-paly-of');
        } else {
            autoPlayBtnElement.innerHTML = 'Auto Play';
            autoPlayBtnElement.classList.remove('js-auto-paly-of');
        }
}



function playGame(playerMove) {

    const computerMove = pickComputerMove();
    let result = '';
        if (playerMove === 'rock') {
            if (computerMove === 'rock') {
                result = 'Tie.';
            } else if (computerMove === 'paper') {
                result = 'You lose.';
            } else {
                result = 'You win.';
            }
            pickRockHand();
            
        } else if (playerMove === 'paper') {
            if (computerMove === 'rock') {
                result = 'You win.';
            } else if (computerMove === 'paper') {
                result = 'Tie.';
            } else {
                result = 'You lose.';
            }
            document.querySelector('.js-your-pick').innerHTML = `<i class="fa-solid fa-hand"></i>`;
        } else {
            if (computerMove === 'rock') {
                result = 'You lose.';
            } else if (computerMove === 'paper') {
                result = 'You win.';
            } else {
                result = 'Tie.';
            }
            document.querySelector('.js-your-pick').innerHTML = `<i class="fa-solid fa-hand-scissors"></i>`;
        }
        
        if (result === 'You win.') {
            score.win ++;
        } else if (result === 'You lose.') {
            score.lose ++;
        } else {
            score.tie ++;
        }
        reloadScore();
        localStorage.setItem('score', JSON.stringify(score));
        
        const computerPickElement = document.querySelector('.js-computer-pick');
        if (computerMove === 'rock') {
            computerPickElement.innerHTML = `<i class="fa-solid fa-hand-back-fist"></i>`;
        } else if (computerMove === 'paper') {
            computerPickElement.innerHTML = `<i class="fa-solid fa-hand"></i>`;
        } else {
            computerPickElement.innerHTML = `<i class="fa-solid fa-hand-scissors"></i>`;
        }
       
}


function reloadScore() {
     document.querySelector('.js-score').innerHTML = `Win: ${score.win}, Ties: ${score.tie}, Loses: ${score.lose}`;
}
function pickRockHand() {
    document.querySelector('.js-your-pick').innerHTML = `<i class="fa-solid fa-hand-back-fist"></i>`;
}


//Create a random number
function pickComputerMove() {

    const randomNumber = Math.random();
    let computerMove = '';
    
    if(randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissor';
    }
    return computerMove;
}