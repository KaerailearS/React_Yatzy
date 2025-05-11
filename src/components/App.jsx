import React from "react";
import styles from "../styles/App.module.css";
import DiceContainer from "./DiceContainer";
import RollButton from "./RollButton";
import Scoreboard from "./Scoreboard";
import calculateScore from "../utils/calculateScore";
import {calculateUpperScore, calculateLowerScore, calculateTotalScore} from "../utils/calculateTotalScore";

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
  const [scoreboard, setScoreboard] = React.useState(initializeScoreboard);
  const [rollsLeft, setRollsLeft] = React.useState(2);
  const [gameOver, setGameOver] = React.useState(false);

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
    const updatedScoreboard = {
      ...scoreboard,
      [category]: score,
    };

    setScoreboard(updatedScoreboard);

    const allUsed = Object.values(updatedScoreboard).every(
      (val) => val !== null
    );
    if (allUsed) {
      setGameOver(true);
    } else {
        setDice(generateAllNewDice());
        setRollsLeft(MAX_ROLLS);
  }
  }

  function initializeScoreboard() {
    return {
      Ones: null,
      Twos: null,
      Threes: null,
      Fours: null,
      Fives: null,
      Sixes: null,
      "One Pair": null,
      "Two Pairs": null,
      "Three of a Kind": null,
      "Four of a Kind": null,
      "Full House": null,
      "Small Straight": null,
      "Large Straight": null,
      Chance: null,
      Yatzy: null,
    };
  }

  function startNewGame() {
    setScoreboard(initializeScoreboard);
    setDice(generateAllNewDice);
    setRollsLeft(2);
    setGameOver(false);
  }

  const allCategoriesUsed = Object.values(scoreboard).every(
    (score) => score !== null
  );
  return (
    <>
      <main className="app">
        <h1>Yatzy</h1>
        <DiceContainer dice={dice} holdDie={holdDie} />
        <RollButton
          onRoll={rollDice}
          rollsLeft={rollsLeft}
          maxRolls={MAX_ROLLS}
        />
        <Scoreboard
          dice={dice}
          scoreboard={scoreboard}
          onCategorySelect={handleCategorySelection}
          gameOver={gameOver}
        />
      </main>
      {gameOver && (
        <div className={styles.gameOver}>
          <h2>Game over!</h2>
          <p>Your final score: {calculateTotalScore(scoreboard)}</p>
          <button onClick={startNewGame}>New game?</button>
        </div>
      )}
    </>
  );
}
