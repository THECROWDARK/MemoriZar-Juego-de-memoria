const EMOJIS = ["🐶", "🤺", "​😏", "​💖", "​🥰", "​🥶", "​🥵","🧙‍♂️"]
const dupilicate = [...EMOJIS, ...EMOJIS]
console.log(dupilicate)

const gameBoard = document.getElementById('game-boar')
const move= document.getElementById('moves')
const times= document.getElementById('times')
const score = document.getElementById('score')
const startButton = document.getElementById('start-stop-btn')
const gameInfo = document.getElementById('game-info')

let gamestate= {   // objeto de estado (para definir que tipo de estado esta y luego modificarlo)
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
shuffleArray(dupilicate)

console.log(dupilicate)

const createCard = (emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dateset.emoji = emoji;
    //card.textContent = emoji
    card.addEventListener('click', () => flipCard(card));
    return card;

}

flipCard = (card) => {
    if(!gamestate.isGameRunning || gameStates.flippedCards.lenght > 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.texContent = card.dataset.emoji;
    gameState.flippedCards.push(card);

    if (gamestate.flippedCards.length === 2) {
        
    }
}
