import React from 'react'
import styles from '../styles/PlayerSetup.module.css'

export default function PlayerSetup({ onStart }) {
  const [numPlayers, setNumPlayers] = React.useState(2);
  const [names, setNames] = React.useState(["", ""]);

  const handlePlayerCountChange = (count) => {
    setNumPlayers(count);
    setNames(Array(count).fill(""));
  };
  const handleNameChange = (index, value) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const handleStart = () => {
    const playerList = names.map((name, i) => name || `Player ${i + 1}`);
    onStart(playerList);
  };

  return (
    <div className={styles.playerSetup}>
      <h2>Select number of Players</h2>
      <select
        value={numPlayers}
        onChange={(e) => handlePlayerCountChange(Number(e.target.value))}
      >
        {[1, 2, 3, 4].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      {names.map((name, i) => (
        <input
          key={i}
          className={styles.nameInputs}
          type="text"
          placeholder={`Player ${i + 1} name`}
          value={name}
          onChange={(e) => handleNameChange(i, e.target.value)}
        />
      ))}
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}
