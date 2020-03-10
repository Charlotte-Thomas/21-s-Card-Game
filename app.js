
function setupGame() {

  const deck = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
  const suites = ['Hearts', 'Diamonds', 'Clubs', 'Spades']

  const sam = document.querySelector('.sam')
  const dealer = document.querySelector('.dealer')

  const samContainer = document.querySelector('.container1')
  const dealerContainer = document.querySelector('.container2')

  const cardOne = document.querySelector('.cardOne')
  const cardTwo = document.querySelector('.cardTwo')
  const cardThree = document.querySelector('.cardThree')
  const cardFour = document.querySelector('.cardFour')

  const busted = document.querySelector('.bust')
  const busted2 = document.querySelector('.bust2')
  const score = document.querySelector('.score')
  const score2 = document.querySelector('.score2')

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
      if (hand === samsHand) {
        busted.style.display = 'block'
        samContainer.style.backgroundColor = 'rgb(142, 72, 72)'
        dealerContainer.style.backgroundColor = 'rgb(78, 132, 78)'
      }
      if (hand === dealersHand) {
        busted2.style.display = 'block'
        samContainer.style.backgroundColor = 'rgb(78, 132, 78)'
        dealerContainer.style.backgroundColor = 'rgb(142, 72, 72)'
      }
    }
    if (hand === samsHand) {
      score.style.display = 'block'
      score.innerHTML = 'score:' + ' ' + sum
    }
    if (hand === dealersHand) {
      score2.innerHTML = 'score:' + ' ' + sum
    }
    if (hand === samsHand) {
      score2.style.display = 'block'
    }
    return sum
  }

  function checkHand() {
    if (cardsInPlay[0] + cardsInPlay[1] === 21) {
      console.log('sam wins')
      samContainer.style.backgroundColor = 'rgb(78, 132, 78)'
      dealerContainer.style.backgroundColor = 'rgb(142, 72, 72)'
      return
    } else if (cardsInPlay[2] + cardsInPlay[3] === 21) {
      console.log('dealer wins')
      dealerContainer.style.backgroundColor = 'rgb(78, 132, 78)'
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
          samContainer.style.backgroundColor = 'rgb(142, 72, 72)'
          dealerContainer.style.backgroundColor = 'rgb(78, 132, 78)'
        }
      }
      if (add(samsHand) === 21) {
        console.log('sam wins')
        samContainer.style.backgroundColor = 'rgb(78, 132, 78)'
        dealerContainer.style.backgroundColor = 'rgb(142, 72, 72)'
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
        samContainer.style.backgroundColor = 'rgb(78, 132, 78)'
        dealerContainer.style.backgroundColor = 'rgb(142, 72, 72)'
      }
    }
    console.log('dealers hand', add(dealersHand))
    if (add(dealersHand) > add(samsHand) && add(dealersHand) <= 21 || bust && add(dealersHand) <= 21) {
      console.log('dealer wins')
      samContainer.style.backgroundColor = 'rgb(142, 72, 72)'
      dealerContainer.style.backgroundColor = 'rgb(78, 132, 78)'
    }
  }




  restartButton.addEventListener('click', () => {
    popArray(samsHand)
    popArray(dealersHand)
    popArray(cardsInPlay)
    bust = false
    busted.style.display = 'none'
    busted2.style.display = 'none'
    samContainer.style.backgroundColor = 'pink'
    dealerContainer.style.backgroundColor = 'pink'
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
