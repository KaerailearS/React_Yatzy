import React from "react"
import Confetti from 'react-confetti'
import Die from "./Die"


export default function App(){
  const [dice, setDice] = React.useState(()=>generateAllNewDice())

  const gameWon = dice.every(die => die.isHeld) &&
  dice.every(die => die.value === dice[0].value)
  function generateAllNewDice(){
    return new Array(10)
      .fill(0)
      .map((_, index)=>({
        value:Math.ceil(Math.random()*6),
        isHeld:false,
        id:index+1
      }))
  }

  const diceElements = dice.map((die)=>{
    return (
      <Die 
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        className={die.isHeld ? "isHeld" : "isntHeld"}
        onClick={hold}
        id={die.id}/>)
  })
  function rollDice(){
    if(!gameWon){
    setDice(prevDice => prevDice.map(die =>
      die.isHeld ? die :
      {...die, value: Math.ceil(Math.random()*6)}
    ))} else {
      setDice(generateAllNewDice)
    }

  }
  function hold(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const buttonRef = React.useRef(null)
  React.useEffect(()=>{
    if(gameWon){
      buttonRef.current?.focus()
    }
  },[gameWon])
  return (
    <>
      <main>
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-div">
          {diceElements}
        </div>
        <button
          ref={buttonRef}
          className="roll-button"
          onClick={rollDice}>
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  )
}

