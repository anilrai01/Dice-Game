/*

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as 
he wishes. Each result get added to his Round score
- But, it the player rolls a 1, all his round score gets lost. After that,  
it's the next players's turn.
-The player can choose to 'Hold', which means that his ROUND score gets added 
to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores = [0,0];
roundScore = 0;
activePlayer = 1;

dice = Math.floor(Math.random() * 6) + 1;


//Changing Dice Value using selector query
//setter
document.querySelector('#scored-' + activePlayer).textContent = dice;

// document.querySelector('#scored-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Reading Score
//getter
var x = document.querySelector('#totalScore-0').textContent;
console.log(x);

//changing css using query selector

document.querySelector('.dice').style.display = 'none';

//Function
function btn(){
    
}

//Setting up Event Handler
document.querySelector('.btn-roll').addEventListener('click',)