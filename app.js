
function setupGame() {

  const deck = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
  const suites = ['Hearts', 'Diamonds', 'Clubs', 'Spades']

  const sam = document.querySelector('.sam')
  const dealer = document.querySelector('.dealer')

  const cardOne = document.querySelector('.cardOne')
  const cardTwo = document.querySelector('.cardTwo')
  const cardThree = document.querySelector('.cardThree')
  const cardFour = document.querySelector('.cardFour')

  const firstCards = [cardOne, cardTwo, cardThree, cardFour]

  const restartButton = document.querySelector('.restartButton')

  const samsHand = []
  const dealersHand = []

  const cardsInPlay = []

  function startGame() {
    firstCards.forEach((card) => {
      card.innerHTML = randomCard()
    })
    samsHand.push(cardsInPlay[0])
    samsHand.push(cardsInPlay[1])
    dealersHand.push(cardsInPlay[2])
    dealersHand.push(cardsInPlay[3])
    checkHand()
  }

  function randomCard() {
    const randomCard = parseInt(Math.random() * 13)
    const card = deck[randomCard]
    const randomSuite = parseInt(Math.random() * 4)
    const suite = suites[randomSuite]
    if (card === 'Ace') {
      cardsInPlay.push(11)
      return `${11} of ${suite}`
    } else if (card === 'Jack' || card === 'Queen' || card === 'King') {
      cardsInPlay.push(10)
      return `${10} of ${suite}`
    } else {
      cardsInPlay.push(card)
      return `${card} of ${suite}`
    }
  }

  let bust = false

  function add(hand) {
    const sum = hand.reduce(function (a, b) {
      return a + b
    })
    if (sum > 21) {
      bust = true
    }
    return sum
  }

  function checkHand() {
    if (cardsInPlay[0] + cardsInPlay[1] === 21) {
      console.log('sam wins')
      return
    } else if (cardsInPlay[2] + cardsInPlay[3] === 21) {
      console.log('dealer wins')
      return
    } else if (!bust && add(samsHand) < 17) {
      while (add(samsHand) < 17) {
        const split = randomCard()
        samsHand.push(parseInt(split.split(' ')[0]))
        // console.log('split', split.split(' ')[0])
        const newCard = document.createElement('p')
        newCard.textContent = split
        // newCard.setAttribute('class', 'note')
        sam.appendChild(newCard)
        add(samsHand)
        if (bust) {
          console.log('sam is bust')
        }
      }
      if (add(samsHand) === 21) {
        console.log('sam wins')
        return
      }
      console.log('sams hand', add(samsHand))
    }
    while (!bust && add(dealersHand) <= add(samsHand)) {
      const split = randomCard()
      dealersHand.push(parseInt(split.split(' ')[0]))
      const newCard = document.createElement('p')
      newCard.textContent = split
      // newCard.setAttribute('class', 'note')
      dealer.appendChild(newCard)
      // add(dealersHand)
      if (add(dealersHand) > 21) {
        console.log('dealer is bust')
      }
    }
    console.log('dealers hand', add(dealersHand))
    if (add(dealersHand) > add(samsHand) && add(dealersHand) <= 21 || bust && add(dealersHand) <= 21) {
      console.log('dealer wins')
    }
  }



  restartButton.addEventListener('click', () => {
    popArray(samsHand)
    popArray(dealersHand)
    popArray(cardsInPlay)
    bust = false
    while (sam.children.length > 3) {
      sam.removeChild(sam.lastChild)
    }
    while (dealer.children.length > 3) {
      dealer.removeChild(dealer.lastChild)
    }
    // console.log(sam)
    startGame()
  })

  function popArray(array) {
    array.splice(0, array.length)
  }

  startGame()



}

// still need to fix same cards showing 
// add reset button functionality 

document.addEventListener('DOMContentLoaded', setupGame)
