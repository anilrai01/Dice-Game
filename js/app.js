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


--Challenges
- Player looses all his score if he scores 6 twice in a row
- Input field to set the winning score
- Add second dice (If only one dice is 1 then you loose all score)

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice = [0,0], winningScore;
// console.log(gamePlaying);
gameInit();


//Changing Dice Value using selector query
//setter
//document.querySelector('#scored-' + activePlayer).textContent = dice;

// document.querySelector('#scored-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Reading Score
//getter
// var x = document.querySelector('#totalScore-0').textContent;
// console.log(x);

//changing css using query selector setting dice invisible
// document.querySelector('.dice').style.visibility = 'hidden';

//New Selector for ID's 
//Setting up everything to zero
// document.getElementById('scored-0').textContent = '0';
// document.getElementById('scored-1').textContent = '0';
// document.getElementById('totalScore-0').textContent = '0';
// document.getElementById('totalScore-1').textContent = '0';

//Setting up Event Handler for button roll with Anonymous Funtion
document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying) {

    var dice = [0,0];
        // 1. Random Number
    dice[0] = Math.floor(Math.random() * 6) + 1;
    dice[1] = Math.floor(Math.random() * 6) + 1;


    // console.log('Active Player = ' + activePlayer);
    if(prevDice[activePlayer] === dice){
        prevDice[activePlayer] = 0;
        // document.getElementById('scored-' + activePlayer).textContent = 0;
        document.getElementById('totalScore-' + activePlayer).textContent = 0;
        nextPlayer();
    } else{

        // 2. Display the result
    var diceDOM1 = document.querySelector('.dice1');
    var diceDOM2 = document.querySelector('.dice2');

    diceDOM1.style.visibility = 'visible';
    diceDOM2.style.visibility = 'visible';

    diceDOM1.src = 'img/dice-' + dice[0] + '.png';
    diceDOM2.src = 'img/dice-' + dice[1] + '.png';

    // console.log(dice);

    // 3. Update the round score if the rolled number was not 1
    if(dice[0] !== 1 && dice[1] !== 1){
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

    }
    
});


// Setting up Event Handler for Button hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){

        //Add current scored to Global Score
    scores[activePlayer] += roundScore;
    
    //Update UI
    document.getElementById('totalScore-' + activePlayer).textContent = scores[activePlayer];

    // Check if the player won the game
    var x =  document.getElementById('setGoal').value;

    if(x > 0){
        winningScore = x;
    } else{
        winningScore = 100;
    }

    // console.log(typeof x);
    // console.log(x);

    if(scores[activePlayer] >= winningScore){
        document.getElementById('name-'+activePlayer).textContent = 'Winner !';
        document.querySelector('.player-'+ activePlayer).classList.remove('active');
        document.querySelector('.player-'+ activePlayer).classList.add('winner');
        gamePlaying = false;
        // console.log(gamePlaying);

    }else{
        // Next Player Turn
        nextPlayer();
    }

    }
    
});

// Setting up new game button
document.querySelector('.btn-new').addEventListener('click', gameInit);



function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    zeroScored();

    //document.querySelector('.firstPlayer').classList.remove('active-bg');
    //document.querySelector('.secondPlayer').classList.add('active-bg');

    //Changing Active State
    document.querySelector('.player-0').classList.toggle('active');
    document.querySelector('.player-1').classList.toggle('active');
}

function gameInit(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;
    // console.log(gamePlaying);

    zeroScored();
    zeroTotal();

    document.querySelector('.dice1').style.visibility = 'hidden';
    document.querySelector('.dice2').style.visibility = 'hidden';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0').classList.remove('active');
    document.querySelector('.player-1').classList.remove('active');
    document.querySelector('.player-0').classList.add('active');

    document.querySelector('.player-0').classList.remove('winner');
    document.querySelector('.player-1').classList.remove('winner');
    
    
}

function zeroScored(){
    document.getElementById('scored-0').textContent = 0;
    document.getElementById('scored-1').textContent = 0;
}

function zeroTotal(){
    document.getElementById('totalScore-0').textContent = 0;
    document.getElementById('totalScore-1').textContent = 0;
}