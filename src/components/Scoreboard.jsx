import React from "react";
import styles from "../styles/Scoreboard.module.css";
import calculateScore from "../utils/calculateScore.js";
import {
  calculateUpperScore,
  calculateLowerScore,
  calculateBonus,
  calculateTotalScore,
} from "../utils/calculateTotalScore.js";

// component for rendering the scoreboard - up to 4 scoreboards, depending on # of players, preview score for active player, locked in score for all players. (total score currently bugged)
export default function Scoreboard({
  players,
  scoreboards,
  dice,
  currentPlayerIndex,
  onCategorySelect,
  gameOver,
}) {
  const currentScoreboard = scoreboards[currentPlayerIndex];

  const upperScore = calculateUpperScore(currentScoreboard);
  const lowerScore = calculateLowerScore(currentScoreboard);
  const bonus = calculateBonus(upperScore);
  const totalScore = calculateTotalScore(currentScoreboard);

  // handling the click on chosen category
  function handleClick(category) {
    if (currentScoreboard[category] === null && dice) {
      const score = calculateScore(category, dice);
      onCategorySelect(category, score);
    }
  }

  return (
    <section className={styles.scoreboard}>
      <h2>Scoreboard</h2>

      <div className={styles.categories}>
        <div className={styles.headerRow}>
          <span>Category</span>
          {players.map((player, index) => (
            <span key={index}>
              {index === currentPlayerIndex ? `→ ${player}` : player}
            </span>
          ))}
        </div>

        {Object.keys(currentScoreboard).map((category) => (
          <div key={category} className={styles.scoreRow}>
            <span>{category}</span>
            {scoreboards.map((scoreboard, playerIndex) => {
              const currentScore = scoreboard[category];
              const isUsed = currentScore !== null;
              const isActive = playerIndex === currentPlayerIndex;
              const potentialScore =
                isActive && dice ? calculateScore(category, dice) : null;
              const showPreview =
                isActive &&
                !gameOver &&
                dice &&
                (!isUsed || currentScore !== potentialScore);

              return (
                <button
                  key={playerIndex}
                  className={styles.category}
                  disabled={!isActive || isUsed}
                  onClick={() => isActive && handleClick(category)}
                >
                  {isUsed ? (
                    currentScore
                  ) : showPreview ? (
                    <span className={styles.previewScore}>
                      {potentialScore}
                    </span>
                  ) : (
                    "-"
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {/* total scores for current player*/}
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
