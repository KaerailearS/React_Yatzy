import styles from '../styles/Die.module.css'

// rendering for individual Die component/buttons, receiving necessary data via props
export default function Die({value, isHeld, onClick}){
  return (
    <button
      className={`${styles.die} ${isHeld ? styles.held : ""}`}
      onClick={onClick}
      aria-pressed={isHeld}
      aria-label={`Die with value of ${value}, ${isHeld ? "held" : "not held"}`}>
        {value}
      </button>
  )
}