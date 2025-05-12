import React from "react";
import styles from "../styles/App.module.css";
import DiceContainer from "./DiceContainer";
import RollButton from "./RollButton";
import Scoreboard from "./Scoreboard";
import calculateScore from "../utils/calculateScore";
import { calculateTotalScore } from "../utils/calculateTotalScore";
import PlayerSetup from "./PlayerSetup";
import createEmptyScoreboard from "../utils/createEmptyScoreboard";

export default function App() {
  const MAX_ROLLS = 2;
  const NUM_DICE = 5;
  const categories = [
    "Ones",
    "Twos",
    "Threes",
    "Fours",
    "Fives",
    "Sixes",
    "One Pair",
    "Two Pairs",
    "Three of a Kind",
    "Four of a Kind",
    "Small Straight",
    "Large Straight",
    "Full House",
    "Chance",
    "Yatzy",
  ];

  const [dice, setDice] = React.useState(() => generateAllNewDice());
  const [scoreboards, setScoreboards] = React.useState();
  const [rollsLeft, setRollsLeft] = React.useState(2);
  const [gameOver, setGameOver] = React.useState(false);
  const [players, setPlayers] = React.useState([]);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0);

  function generateAllNewDice() {
    return Array.from({ length: NUM_DICE }, (_, i) => ({
      id: i + 1,
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function rollDice() {
    if (rollsLeft > 0) {
      setDice((prev) =>
        prev.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
      setRollsLeft((prev) => prev - 1);
    }
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function handleCategorySelection(category) {
    if (!dice || dice.length === 0) {
      console.error("Dice is not properly defined.");
      return;
    }

    const score = calculateScore(category, dice);
    const updatedScoreboards = [...scoreboards];
    const currentScoreboard = { ...updatedScoreboards[currentPlayerIndex] };
    currentScoreboard[category] = score;

    updatedScoreboards[currentPlayerIndex] = currentScoreboard;

    setScoreboards(updatedScoreboards);

    const allUsed = Object.values(currentScoreboard).every(
      (val) => val !== null
    );

    const allPlayersDone = updatedScoreboards.every((sb) =>
      Object.values(sb).every((val) => val !== null)
    );

    if (allPlayersDone) {
      setGameOver(true);
    } else {
      let nextIndex = currentPlayerIndex;
      do {
        nextIndex = (nextIndex + 1) % players.length;
      } while (
        Object.values(updatedScoreboards[nextIndex]).every(
          (val) => val !== null
        )
      );
      setCurrentPlayerIndex(nextIndex);
      setDice(generateAllNewDice());
      setRollsLeft(MAX_ROLLS);
    }
  }

  function resetGame() {
    setPlayers([]);
    setScoreboards([]);
    setDice(generateAllNewDice());
    setRollsLeft(2);
    setGameOver(false);
    setCurrentPlayerIndex(0);
    setGameStarted(false);
  }

  return (
    <>
      {!gameStarted ? (
        <PlayerSetup
          onStart={(playerList) => {
            setPlayers(playerList);
            setScoreboards(playerList.map(() => createEmptyScoreboard()));
            setGameStarted(true);
          }}
        />
      ) : (
        <>
          <main className="app">
            <h1>Yatzy</h1>
            <h2 className={styles.currentPlayer}>Current player: {players[currentPlayerIndex]}</h2>
            <DiceContainer dice={dice} holdDie={holdDie} />
            <RollButton
              onRoll={rollDice}
              rollsLeft={rollsLeft}
              maxRolls={MAX_ROLLS}
            />
            <Scoreboard
              players={players}
              scoreboards={scoreboards}
              dice={dice}
              currentPlayerIndex={currentPlayerIndex}
              onCategorySelect={handleCategorySelection}
              gameOver={gameOver}
            />
          </main>
          {gameOver && (
            <div className={styles.gameOver}>
              <h2>Game over!</h2>
              <h3>Final scores:</h3>
              <ul>
                {scoreboards.map((board, index) => {
                  const score = calculateScore(board);
                  const isWinner = score === highestScore;
                  return (
                    <li key={index} style={styles.isWinner}>
                      {players[index]}: {score} {isWinner && "🏆"}
                    </li>
                  );
                })}
              </ul>
              <button onClick={resetGame}>New game?</button>
            </div>
          )}
        </>
      )}
    </>
  );
}
