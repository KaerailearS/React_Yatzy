import React from "react";
import styles from "../styles/Scoreboard.module.css";

export default function Scoreboard({ dice, onCategorySelect, usedCategories }) {
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

  function handleClick(category) {
    if (!usedCategories.includes(category)) {
      const score = calculateScore(category, dice);
      onCategorySelect(category, score);
    }
  }
  return (
    <div className={styles.scoreboard}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          disabled={usedCategories.includes(category)}
          className={`${styles.category} ${
            usedCategories.includes(category) ? styles.used : ""
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

// Placeholder scoring logic — replace later
//function calculateScore(category, dice) {
//const values = dice.map(d => d.value)
//  const counts = Object.fromEntries([1,2,3,4,5,6].map(n => [n, values.filter(v => v === n).length]))
//
//  switch (category) {
//    case "Ones": return counts[1] * 1
//    case "Twos": return counts[2] * 2
//    case "Threes": return counts[3] * 3
//    case "Fours": return counts[4] * 4
//    case "Fives": return counts[5] * 5
//    case "Sixes": return counts[6] * 6
//    case "Chance": return values.reduce((a, b) => a + b, 0)
//    case "Yatzy": return Object.values(counts).includes(5) ? 50 : 0
//    default: return 0 // logic for pairs/full house etc. will come soon
//  }
//}
