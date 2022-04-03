import Deck from "./deckofcards.js"

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")

let playerDeck, computerDeck, inRound, stop

document.addEventListener("click", () => {
  if (stop) {
    startGame()
    return
  }

  if (inRound) {
    resetTheGame()
  } else {
    flipCards()
  }
})

startGame()
function startGame() {
  const deck = new Deck()
  deck.shuffle()

  const deckInHalf = Math.ceil(deck.amountOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckInHalf))
  computerDeck = new Deck(deck.cards.slice(deckInHalf, deck.amountOfCards))
  inRound = false
  stop = false

  resetTheGame()
}

function resetTheGame() {
  inRound = false
  computerCardSlot.innerHTML = ""
  playerCardSlot.innerHTML = ""
  text.innerText = ""

  countTheDeck()
}

function flipCards() {
  inRound = true

  const playerCard = playerDeck.pop()
  const computerCard = computerDeck.pop()

  playerCardSlot.appendChild(playerCard.getHTML())
  computerCardSlot.appendChild(computerCard.getHTML())

  countTheDeck()

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Winner Winner, next turn!"
    playerDeck.push(playerCard)
    playerDeck.push(computerCard)
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "You lost, next turn"
    computerDeck.push(playerCard)
    computerDeck.push(computerCard)
  } else {
    text.innerText = "Tie Game, Start Over"
    playerDeck.push(playerCard)
    computerDeck.push(computerCard)
  }

  if (gameOver(playerDeck)) {
    text.innerText = "Sorry you lost the game :("
    stop = true
  } else if (gameOver(computerDeck)) {
    text.innerText = "Winner of the game!"
    stop = true
  }
}

function countTheDeck() {
  computerDeckElement.innerText = computerDeck.amountOfCards
  playerDeckElement.innerText = playerDeck.amountOfCards
}

function isRoundWinner(firstDraw, secondDraw) {
  return CARD_VALUE_MAP[firstDraw.value] > CARD_VALUE_MAP[secondDraw.value]
}

function gameOver(deck) {
  return deck.amountOfCards === 0
}