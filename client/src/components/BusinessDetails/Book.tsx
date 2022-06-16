import { useState } from 'react'

interface Props {
  phone: string
  ownerId: string
  thisOwnerId: string
}

export const Book = (props: Props) => {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)

  const phoneNumber = `(${props.phone.slice(0, 3)}) ${props.phone.slice(
    3,
    6
  )}-${props.phone.slice(6)}`

  const phoneNumberButtonClickHandler = (): void => {
    setShowPhoneNumber(true)
  }

  const BookButton: JSX.Element = (
    <button
      onClick={phoneNumberButtonClickHandler}
      className='btn--btn-primary review book'>
      Book Now
    </button>
  )

  return (
    <>
      {/* {props.ownerId !== props.thisOwnerId || props.ownerId === null ? (
        showPhoneNumber ? (
          <p className='phoneNumber'>{phoneNumber}</p>
        ) : (
          BookButton
        )
      ) : null} */}

      {showPhoneNumber ? (
        <p className='phoneNumber'>{phoneNumber}</p>
      ) : (
        BookButton
      )}
    </>
  )
}
