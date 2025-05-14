// functions for calculating different types of score - upper, lower, bonus, total
export function calculateUpperScore(scoreboard) {
  const upperCategories = ["Ones", "Twos", "Threes", "Fours", "Fives", "Sixes"];
  return upperCategories.reduce(
    (total, cat) => total + (scoreboard[cat] || 0),
    0
  );
}

export function calculateLowerScore(scoreboard) {
  const lowerCategories = [
    "One Pair",
    "Two Pairs",
    "Three of a Kind",
    "Four of a Kind",
    "Full House",
    "Small Straight",
    "Large Straight",
    "Chance",
    "Yatzy",
  ];
  return lowerCategories.reduce(
    (total, cat) => total + (scoreboard[cat] || 0),
    0
  );
}

export function calculateBonus(upperScore) {
  return upperScore >= 63 ? 50 : 0;
}
export function calculateTotalScore(scoreboard) {
  const upper = calculateUpperScore(scoreboard);
  const lower = calculateLowerScore(scoreboard);
  const bonus = calculateBonus(upper);
  return upper + lower + bonus;
}
