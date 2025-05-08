import React from "react";
import Die from "./Die";
import styles from "../styles/DiceContainer.module.css";

export default function DiceContainer({ dice, holdDie }) {
  return (
    <div className={styles.diceContainer}>
      {dice.map((die) => (
        <Die
          key={die.id}
          value={die.value}
          isHeld={die.isHeld}
          onClick={() => holdDie(die.id)}
        />
      ))}
    </div>
  );
}
