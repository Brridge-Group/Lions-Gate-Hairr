import './Card.css'
interface Props {
  stars: number
}

export const Star = (props: Props) => {
  const star: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(props.stars) - 1) {
      return (
        <div className='star btn-review on' key={i}>
          &#9733;
        </div>
      )
    } else {
      return (
        <div className='star btn-review off' key={i}>
          &#9733;
        </div>
      )
    }
  })

  return <div className='Star-container'>{star}</div>
}

export const StarSmall = (props: Props) => {
  const star: JSX.Element[] = [...Array(5)].map((star, i) => {
    if (i <= Math.round(props.stars) - 1) {
      return (
        <div className='star_small btn-review_small on' key={i}>
          &#9733;
        </div>
      )
    } else {
      return (
        <div className='star_small btn-review_small off ' key={i}>
          &#9733;
        </div>
      )
    }
  })

  return <div className='Star-container_small'>{star}</div>
}
