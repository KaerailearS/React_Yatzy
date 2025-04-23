export default function Die(props){
  return (
    <button
      className={props.className}
      onClick={()=>props.onClick(props.id)}>{props.value}</button>
  )
}