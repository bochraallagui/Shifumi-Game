import React, { useState } from 'react';
import './Game.css';
import Confetti from 'react-confetti';
import winSound from '../sounds/win.wav';
import loseSound from '../sounds/lose.wav';
import drawSound from '../sounds/draw.wav';

// Defines the choices available in the game with corresponding emojis:
const choices = {
  rock: { name: 'Rock', emoji: '👊' },
  paper: { name: 'Paper', emoji: '✋' },
  scissors: { name: 'Scissors', emoji: '✌' },
};

function Game() {
  // State hooks to manage the game's dynamic data :
  const [mode, setMode] = useState('single'); // Game mode: single or multiplayer
  const [showRules, setShowRules] = useState(false); // Toggle visibility of game rules
  const [currentTurn, setCurrentTurn] = useState('Player 1'); // Track current player turn in multiplayer
  const [player1Choice, setPlayer1Choice] = useState(null); // Choice of Player 1
  const [player2Choice, setPlayer2Choice] = useState(null); // Choice of Player 2 or computer in single mode
  const [result, setResult] = useState(''); // Result of each round
  const [player1Score, setPlayer1Score] = useState(0); // Player 1's score
  const [player2Score, setPlayer2Score] = useState(0); // Player 2's or computer's score

  // Function to play sound effects based on game outcomes:
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  // Handles choice selection by players or against computer :
  const handleChoice = (choiceKey) => {
    const choice = choices[choiceKey];
    if (mode === 'single') {
      const computerChoice = choices[Object.keys(choices)[Math.floor(Math.random() * Object.keys(choices).length)]];
      setPlayer1Choice(choice);
      setPlayer2Choice(computerChoice);
      updateScore(choice, computerChoice);
    } else {
      if (currentTurn === 'Player 1') {
        setPlayer1Choice(choice);
        setCurrentTurn('Player 2');
      } else {
        setPlayer2Choice(choice);
        updateScore(player1Choice, choice);
        setCurrentTurn('Player 1');
      }
    }
  };

  // Updates the score after each choice and determines the round's winner :
  const updateScore = (player1, player2) => {
    const winner = determineWinner(player1, player2);
    setResult(winner);
    if (winner === 'Player 1 wins!') {
      setPlayer1Score(player1Score + 1);
      playSound(winSound);
    } else if (winner === 'Player 2 wins!') {
      setPlayer2Score(player2Score + 1);
      playSound(loseSound);
    } else {
      playSound(drawSound);
    }
  };

  // Determines the winner of a round based on the rules of Rock-Paper-Scissors :
  const determineWinner = (player1, player2) => {
    if (!player2 || player1.name === player2.name) return "It's a draw!";
    if ((player1.name === 'Rock' && player2.name === 'Scissors') ||
        (player1.name === 'Paper' && player2.name === 'Rock') ||
        (player1.name === 'Scissors' && player2.name === 'Paper')) {
      return currentTurn === 'Player 2' ? 'Player 1 wins!' : 'Player 2 wins!';
    }
    return currentTurn === 'Player 2' ? 'Player 2 wins!' : 'Player 1 wins!';
  };

// Resets the game to initial state :
  const resetGame = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult('');
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentTurn('Player 1');
  };

  return (
    <div className="game">
      {result.includes('wins') && <Confetti />}
      <h1>Welcome to the shifumi game!</h1>
      <div className="mode-toggle">
        <button className={mode === 'single' ? 'active' : ''} onClick={() => { setMode('single'); resetGame(); }}>
          Single Player
        </button>
        <button className={mode === 'multiplayer' ? 'active' : ''} onClick={() => { setMode('multiplayer'); resetGame(); }}>
          Multiplayer
        </button>
      </div>
      <div className="choice-buttons">
        {Object.keys(choices).map(key => (
          <button
            key={key}
            className="choice-button"
            onClick={() => handleChoice(key)}
            disabled={mode === 'multiplayer' && currentTurn === 'Player 2' && player1Choice === null}
          >
            {choices[key].emoji}
          </button>
        ))}
      </div>
      <div className="results">
        <p>Player 1's choice: {player1Choice ? player1Choice.emoji : '-'}</p>
        <p>{mode === "single" ? "Computer's choice" : "Player 2's choice"}: {player2Choice ? player2Choice.emoji : '-'}</p>
        <p>{result}</p>
      </div>
      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <p>Player 1: {player1Score}</p>
        <p>{mode === "single" ? "Computer" : "Player 2"}: {player2Score}</p>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
      <div className="rules-section">
        <button className="rules-toggle" onClick={() => setShowRules(!showRules)}>
          {showRules ? 'Hide Rules' : 'Show Rules'}
        </button>
        {showRules && (
          <div className="rules-content">
            <h3>Game Rules</h3>
            <ul>
              <li>Rock beats Scissors</li>
              <li>Scissors beats Paper</li>
              <li>Paper beats Rock</li>
              <li>The player with the winning choice scores a point</li>
              <li>In Multiplayer mode, players take turns making choices</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
