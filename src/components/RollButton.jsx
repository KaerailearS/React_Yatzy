import React from 'react'
import styles from '../styles/RollButton.module.css'

// separate component for the button that handles rerolling dice
export default function RollButton({ onRoll, rollsLeft, maxRolls}) {
  const isDisabled = rollsLeft <= 0

  return (
    <button 
    onClick={onRoll}
    disabled={isDisabled}
    className={styles.rollButton}>
      {isDisabled ? "No rolls left" : `Roll (${rollsLeft} left)`}
    </button>
  )
}