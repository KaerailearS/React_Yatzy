import React from "react"
import Die from "./Die"


export default function App(){
  const [dice, setDice] = React.useState(generateAllNewDice)

  function generateAllNewDice(){
    return new Array(10)
      .fill(0)
      .map((_, index)=>({
        number:Math.ceil(Math.random()*6),
        isHeld:true,
        id:index+1
      }))
  }

  const diceElements = dice.map((die)=>{
    return (
      <Die 
        key={die.id}
        value={die.number}
        isHeld={die.isHeld}
        className={die.isHeld ? "isHeld" : "isntHeld"}
        onClick={hold}
        id={die.id}/>)
  })

  function hold(id){
    console.log(id)
  }
  return (
    <>
      <main>
          <div className="dice-div">
            {diceElements}
          </div>
          <button
            className="roll-button"
            onClick={()=>setDice(generateAllNewDice)}>
            Roll
          </button>
      </main>
    </>
  )
}

