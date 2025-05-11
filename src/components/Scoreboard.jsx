import React from "react";
import styles from "../styles/Scoreboard.module.css";
import calculateScore from "../utils/calculateScore.js";
import {
  calculateUpperScore,
  calculateLowerScore,
  calculateBonus,
  calculateTotalScore,
} from "../utils/calculateTotalScore.js";

export default function Scoreboard({ dice, onCategorySelect, scoreboard, gameOver }) {
  const upperScore = calculateUpperScore(scoreboard);
  const lowerScore = calculateLowerScore(scoreboard);
  const bonus = calculateBonus(upperScore);
  const totalScore = calculateTotalScore(scoreboard);

  function handleClick(category) {
    if (scoreboard[category] === null && dice) {
      const score = calculateScore(category, dice);
      onCategorySelect(category, score);
    }
  }

  return (
    <section className={styles.scoreboard}>
      <h2>Scoreboard</h2>
      <div className={styles.categories}>
        {Object.keys(scoreboard).map((category) => {
          const currentScore = scoreboard[category];
          const potentialScore = dice ? calculateScore(category, dice) : null;
          const isUsed = currentScore !== null;
          const showPreview = !gameOver && dice && (!isUsed || currentScore !== potentialScore);

          return (
            <button
              key={category}
              className={styles.category}
              disabled={isUsed}
              onClick={() => handleClick(category)}
            >
              <span>{category}</span>
              <span>
                {isUsed ? (
                  <>
                    {currentScore}
                  </>
                ) : showPreview ? (
                  <span className={styles.previewScore}>{potentialScore}</span>
                ) : (
                  "-"
                )}
              </span>
            </button>
          );
        })}
      </div>
      <div className={styles.totals}> 
        <div className={styles.subTotals}>
          <div className={styles.upperScore}>
            <span>Upper total: {upperScore}</span>
          </div>
          <div className={styles.bonus}>
            <span>Bonus: {bonus}</span>
          </div>
          <div className={styles.lowerScore}>
            <span>Lower total: {lowerScore}</span>
          </div>
        </div>
        <div className={styles.totalScore}>
          <span>Grand total: {totalScore}</span>
        </div>
      </div>
    </section>
  );
}
