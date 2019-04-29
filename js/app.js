/*

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as 
he wishes. Each result get added to his Round score
- But, if the player rolls a 1, all his round score gets lost. After that,  
it's the next players's turn.
-The player can choose to 'Hold', which means that his ROUND score gets added 
to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points or defined on GLOBAL score wins the game


--Challenges
- Player looses all his score if he scores 6 twice in a row
- Input field to set the winning score
- Add second dice (If only one dice is 1 then you loose all score)

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice = [0, 0], winningScore;

function _get(id) {
  return document.querySelector(id);
}

var DOMbtnNew = _get('.btn-new');
var DOMbtnRoll = _get('.btn-roll');
var DOMbtnHold = _get('.btn-hold');

var DOMPlayer0 = _get('.player-0');
var DOMPlayer1 = _get('.player-1');

var DOMDice1 = _get('.dice1');
var DOMDice2 = _get('.dice2');

var DOMName0 = _get('#name-0');
var DOMName1 = _get('#name-1');

var DOMScored0 = _get('#scored-0');
var DOMScored1 = _get('#scored-1');

var DOMTotalScored0 = _get('#totalScore-0');
var DOMTotalScored1 = _get('#totalScore-1');

gameInit();

function ButtonRoll() {

  if (gamePlaying) {

    var dice = [0, 0];
    // 1. Random Number
    dice[0] = Math.floor(Math.random() * 6) + 1;
    dice[1] = Math.floor(Math.random() * 6) + 1;


    if ((prevDice[activePlayer] === dice[0] || prevDice[activePlayer] === dice[1]) || (dice[0] === 6 && dice[2] === 6)) {
      prevDice[activePlayer] = 0;
      // document.getElementById('scored-' + activePlayer).textContent = 0;
      _get('#totalScore-' + activePlayer).textContent = 0;
      nextPlayer();
    } else {

      // 2. Display the result
      DOMDice1.style.visibility = 'visible';
      DOMDice2.style.visibility = 'visible';

      DOMDice1.src = 'img/dice-' + dice[0] + '.png';
      DOMDice2.src = 'img/dice-' + dice[1] + '.png';

      // console.log(dice);

      // 3. Update the round score if the rolled number was not 1
      if (dice[0] !== 1 && dice[1] !== 1) {
        //Add Score
        roundScore += dice[0] + dice[1];
        //Showing in UI
        document.querySelector('#scored-' + activePlayer).textContent = roundScore;
      } else {
        // Next Player turn
        nextPlayer();
      }

    }

    (dice[0] === 6 || dice[1] === 6) ? prevDice[activePlayer] = 6 : prevDice[activePlayer] = 0;
    // prevDice[activePlayer] = dice;

  }

}

function ButtonHold() {

  if (gamePlaying) {

    //Add current scored to Global Score
    scores[activePlayer] += roundScore;

    //Update UI
    _get('#totalScore-' + activePlayer).textContent = scores[activePlayer];

    // Check if the player won the game
    var input = _get('#setGoal').value;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      _get('#name-' + activePlayer).textContent = 'Winner !';
      _get('.player-' + activePlayer).classList.remove('active');
      _get('.player-' + activePlayer).classList.add('winner');
      gamePlaying = false;
    } else {
      // Next Player Turn
      nextPlayer();
    }

  }

}


//Setting up Event Handler for button roll with Anonymous Funtion
DOMbtnRoll.addEventListener('click', ButtonRoll);
// Setting up Event Handler for Button hold
DOMbtnHold.addEventListener('click', ButtonHold);
// Setting up new game button
DOMbtnNew.addEventListener('click', gameInit);



function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  zeroScored();

  //Changing Active State
  DOMPlayer0.classList.toggle('active');
  DOMPlayer1.classList.toggle('active');
}

function gameInit() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  gamePlaying = true;
  // console.log(gamePlaying);

  zeroScored();
  zeroTotal();

  DOMDice1.style.visibility = 'hidden';
  DOMDice2.style.visibility = 'hidden';

  DOMName0.textContent = 'Player 1';
  DOMName1.textContent = 'Player 2';

  DOMPlayer0.classList.remove('active');
  DOMPlayer1.classList.remove('active');
  DOMPlayer0.classList.add('active');

  DOMPlayer0.classList.remove('winner');
  DOMPlayer1.classList.remove('winner');


}

function zeroScored() {
  DOMScored0.textContent = 0;
  DOMScored1.textContent = 0;
}

function zeroTotal() {
  DOMTotalScored0.textContent = 0;
  DOMTotalScored1.textContent = 0;
}