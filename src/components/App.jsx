import React from "react";
import styles from "../styles/App.module.css";
import DiceContainer from "./DiceContainer";
import RollButton from "./RollButton";
import Scoreboard from "./Scoreboard";
import Die from "./Die";

export default function App() {
  const MAX_ROLLS = 3;
  const NUM_DICE = 5;

  const [dice, setDice] = React.useState(() => generateAllNewDice());
  const [rollCount, setRollCount] = React.useState(0);
  const [scoreboard, setScoreboard] = React.useState(initializeScoreboard);

  function generateAllNewDice() {
    return new Array.from({ length: NUM_DICE }, (_, i) => ({
      id: i + 1,
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function rollDice() {
    if (rollCount >= MAX_ROLLS) return;
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function handleScoreSelection(category, score) {
    setScoreboard((prev) => ({
      ...prev,
      [category]: score,
    }));
    setDice(generateAllNewDice());
    setRollCount(0);
  }

  function initializeScoreboard() {
    return {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      onePair: null,
      twoPairs: null,
      threeOfKind: null,
      fourOfKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      chance: null,
      yatzy: null,
    };
  }
  return (
    <>
      <main className="app">
        <h1>Yatzy</h1>
        <DiceContainer dice={dice} holdDie={holdDie} />
        <RollButton
          onRoll={rollDice}
          rollCount={rollCount}
          maxRolls={MAX_ROLLS}
        />
        <Scoreboard
          dice={dice}
          scoreboard={scoreboard}
          onScoreSelect={handleScoreSelection}
        />
      </main>
    </>
  );
}
