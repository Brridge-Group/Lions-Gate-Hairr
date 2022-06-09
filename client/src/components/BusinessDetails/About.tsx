import './BusinessDetails.css'
interface Props {
  name: string
  description: string
  image: string
  address: {
    address1: string
    city: string
    region: string
    postalCode: string
  }
}

export const About = (props: Props) => {
  console.log('in about, props', props)
  return (
    <div className='About'>
      <div className='About-left'>
        <img src={props.image} className='About-pic' alt='Hair salon.' />
      </div>
      <div className='About-right'>
        <h2>{props.name}</h2>
        <h3>{props.description}</h3>
        <p>
          {props.address.address1}
          <br />
          {props.address.city}, {props.address.region}
          <br />
          {props.address.postalCode}
        </p>
      </div>
    </div>
  )
}
