/*
** Created By Arijit Roy Chowdhury
** Date 30/10/2018
*/
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
*/




var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;



document.querySelector('.btn-roll').addEventListener('click', function() {
  //Roll btn is clicked
  if(gamePlaying) {
    //1.Generate a random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2.Display dice with respect to that number
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = "block";
    diceDOM.src = 'assets/images/dice-' + dice + '.png';

    //3.Update Round score If the rolled number is not 1
    if(dice === 6 && lastDice === 6) {
      //Player looses all score
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      //Popup message
      document.getElementById('myModal').style.display = "block";
      document.getElementById('modal-text').textContent = 'Sorry, You rolled 6 two times';
      //Next player
      nextPlayer();
    }
    else if(dice !== 1)
    {
      //Add the score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else {
      //Popup message
      document.getElementById('myModal').style.display = "block";
      document.getElementById('modal-text').textContent = 'Sorry, You rolled 1';
      //Next player
      nextPlayer();
    }
    lastDice = dice;
  }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
  //Hold btn is clicked
  if(gamePlaying) {
    //1.Update total scores
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;
    if(input >= 20 && input <= 500) {
      winningScore = input;
    }
    else {
      winningScore = 100;
    }
    //2.Check if player won the game
    if(scores[activePlayer] >= winningScore)
    {
      document.getElementById('name-'+ activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = "none";
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.getElementById('current-' + activePlayer).textContent = '0';
      gamePlaying = false;
    }
    else {
      //3.Next player
      nextPlayer();
    }
  }
});


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
  gamePlaying = true;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector('.dice').style.display = "none";
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
  roundScore = 0;
  lastDice = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = "none";
}



// When the user clicks the button, open the modal
/*document.getElementById("myBtn").onclick = function() {
    document.getElementById('myModal').style.display = "block";
}*/

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].addEventListener('click', function() {
    document.getElementById('myModal').style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
};
