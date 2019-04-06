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

var scores, roundScore, activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;


//Changing Dice Value using selector query
//setter
//document.querySelector('#scored-' + activePlayer).textContent = dice;

// document.querySelector('#scored-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Reading Score
//getter
// var x = document.querySelector('#totalScore-0').textContent;
// console.log(x);

//changing css using query selector setting dice invisible
document.querySelector('.dice').style.visibility = 'hidden';

//New Selector for ID's 
//Setting up everything to zero
document.getElementById('scored-0').textContent = '0';
document.getElementById('scored-1').textContent = '0';
document.getElementById('totalScore-0').textContent = '0';
document.getElementById('totalScore-1').textContent = '0';


//Setting up Event Handler for button roll with Anonymous Funtion
document.querySelector('.btn-roll').addEventListener('click', function(){

    // 1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.visibility = 'visible';
    diceDOM.src = 'img/dice-' + dice + '.png';

    // console.log(dice);

    // 3. Update the round score if the rolled number was not 1
    if(dice !== 1){
        //Add Score
        roundScore += dice;
        //Showing in UI
        document.querySelector('#scored-' + activePlayer).textContent = roundScore;
    } else {
        // Next Player turn
        nextPlayer();
    }
});


// Setting up Event Handler for Button hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add current scored to Global Score
    scores[activePlayer] += roundScore;
    
    //Update UI
    document.getElementById('totalScore-' + activePlayer).textContent = scores[activePlayer];

    // Check if the player won the game
    if(scores[activePlayer] >= 20){
        document.getElementById('name-'+activePlayer).textContent = 'Winner !';
        document.querySelector('.player-'+ activePlayer).classList.remove('active');
        document.querySelector('.player-'+ activePlayer).classList.add('winner');

    }else{
        // Next Player Turn
        nextPlayer();
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('scored-0').textContent = 0;
    document.getElementById('scored-1').textContent = 0;

    //document.querySelector('.firstPlayer').classList.remove('active-bg');
    //document.querySelector('.secondPlayer').classList.add('active-bg');

    document.querySelector('.player-0').classList.toggle('active');
    document.querySelector('.player-1').classList.toggle('active');
}