const EMOJIS = ["🐶", "🤺", "​😏", "​💖", "​🥰", "​🥶", "​🥵","🧙‍♂️"]
const CARDS = [...EMOJIS, ...EMOJIS]
console.log(CARDS)

const gameBoard = document.getElementById('game-board')
const moveElement= document.getElementById('moves')
const timerElement= document.getElementById('times')
const scoreElement = document.getElementById('score')
const startStopBtn = document.getElementById('start-stop-btn')
const gameInfoElement = document.getElementById('game-info')

let gameState= {   // objeto de estado (para definir que tipo de estado esta y luego modificarlo)
    flippedCards: [],
    move: 0,
    score: 0,
    timer: 0,
    intervalId: null,
    isGameRunning: false,
};

//const shuffleArray = (array) => {
  //  for(let i = array.length; i > 0; i--){
  //      const j = Math.floor(Math.random()* (i + 1))
   // }
//}

function shuffleArray(array) {
    array.sort(()=>Math.random()  -0.5)
}


const createCard = (emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    //card.textContent = emoji
    card.addEventListener('click', () => flipCard(card));
    return card;

}

flipCard = (card) => {
    if(!gameState.isGameRunning || gameState.flippedCards.lenght > 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    gameState.flippedCards.push(card);
    
    if (gameState.flippedCards.length === 2) {
        gameState.move++;
        updateMoveDisplay();
        setTimeout(checkMatch, 500);
    }
}
    

const checkMatch = () => {
    const [card1, card2] = gameState.flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji){
        gameState.score += 10;
        updateMoveDisplay();
        if(document.querySelectorAll('.flipped').length === CARDS.length){
            endGame();
        }    
    } else {
        [card1,card2].forEach((card) => {
            card.classList.remove('flipped');
            card.textContent = '';
        })
    }
    gameState.flippedCards = [];
}

const updateMoveDisplay = () => moveElement.textContent = `Movimientos: ${gameState.move}`;
const updateScoreDisplay = () => scoreElement.textContent = `Puntuacion: ${gameState.score}`;
const updateTimerDisplay = () => timerElement.textContent = `Tiempo: ${gameState.timer}`;

const startTimer =() => { 
    gameState.intervalId = setInterval(() =>{
        gameState.timer++;
        updateTimerDisplay();
    }, 1000);

}

const startGame = () => {
        gameState = {...gameState, flippedCards:[], move: 0, timer:0, score:0, isGameRunning: true};
        shuffleArray(CARDS);
        gameBoard.innerHTML = '';
        CARDS.forEach((emoji)=> gameBoard.appendChild(createCard(emoji)));
        updateMoveDisplay();
        updateScoreDisplay();
        updateTimerDisplay();
        startTimer();

        startStopBtn.textContent = 'Detener Juego';
        gameInfoElement.classList.remove('hidden');

        gameBoard.classList.remove('hidden', 'fade-out');
}

const stopGame =() => {
    
    gameState.isGameRunning = false;
    clearInterval(gameState.intervalId);
    startStopBtn.textContent = 'Iniciar Juego';

    gameInfoElement.classList.add('hidden');
    gameBoard.classList.add('fade-out');
    setTimeout(() => gameBoard.classList.add('hidden',500));

}

const endGame = () => {
    clearInterval(gameState.intervalId);
    const finalScore = gameState.score + Math.max(0,1000 - gameState.timer + 10 - gameState.moves * 5);
    gameState.score = finalScore
    alert(`!JUego terminado! Puntuacion final:${finalScore}`);
    stopGame();
}

const startStopGame = () => gameState.isGameRunning ? stopGame() :  startGame();
    
startStopBtn.addEventListener('click', startStopGame);
/*
document.getElementById('start-stop-btn').addEventListener('click', () =>{
    gameInfoElement.classList.remove('hidden');

    startGame();
})


*/