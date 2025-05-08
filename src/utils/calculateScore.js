export default function calculateScore(category, dice) {
  const values = dice.map((d) => d.value);
  const counts = {};
  values.forEach((v) => (counts[v] = (counts[v] || 0) + 1));

  const countValues = Object.values(counts);
  const entries = Object.entries(counts).map(([v, c]) => ({
    value: Number[v],
    count: c,
  }));
  const sum = values.reduce((a, b) => a + b, 0);

  switch (category) {
    case "Ones":
    case "Twos":
    case "Threes":
    case "Fours":
    case "Fives":
    case "Sixes":
      const num = { Ones: 1, Twos: 2, Threes: 3, Fours: 4, Fives: 5, Sixes: 6 }[
        category
      ];
      return counts[num] ? counts[num] * num : 0;
    case "One Pair":
      const pair = entries
        .filter((e) => e.count >= 2)
        .sort((a, b) => b.value - a.value)[0];
      return pair ? pair.value * 2 : 0;
    case "Two Pairs":
      const pairs = entries
        .filter((e) => e.count >= 2)
        .sort((a, b) => b.value - a.value);
      return pairs.length >= 2 ? (pairs[0].value + pairs[1].value) * 2 : 0;
    case "Three of a Kind":
      const triple = entries.find((e) => e.count >= 3);
      return triple ? triple.value * 3 : 0;
    case "Four of a Kind":
      const quad = entries.find((e) => e.count >= 4);
      return quad ? quad.value * 4 : 0;
    case "Full House":
      const three = entries.find((e) => e.count === 3);
      const two = entries.find((e) => e.count === 2);
      return three && two ? three.value * 3 + two.value * 2 : 0;
    case "Small Straight":
      return [1, 2, 3, 4, 5].every((n) => values.includes(n)) ? 15 : 0;
    case "Large Straight":
      return [2, 3, 4, 5, 6].every((n) => values.includes(n)) ? 20 : 0;
    case "Chance":
      return sum;
    case "Yatzy":
      return countValues.includes(5) ? 50 : 0;

    default:
      return 0;
  }
}
