import './Card.css'

export const Card = props => {
  console.log('in card, props', props)
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  )
}
