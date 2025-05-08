import React from 'react'
import styles from '../styles/RollButton.module.css'

export default function RollButton({ onRoll, rollCount, maxRolls}) {
  const isDisabled = rollCount >= maxRolls

  return (
    <button 
    onClick={onRoll}
    disabled={isDisabled}
    className={styles.rollButton}>
      {isDisabled ? "No rolls left" : `Roll (${maxRolls - rollCount})`}
    </button>
  )
}