export default function Die(props){
  return (
    <button
      className={props.className}
      onClick={()=>props.onClick(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with value of ${props.value}, ${props.isHeld ? "held" : "not held"}`}>
        {props.value}
      </button>
  )
}