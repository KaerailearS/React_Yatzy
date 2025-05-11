import React from 'react'
import styles from '../styles/RollButton.module.css'

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