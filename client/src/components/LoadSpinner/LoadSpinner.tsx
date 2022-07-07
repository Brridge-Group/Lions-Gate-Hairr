// React Components
import React from 'react'

// Custom Styles
import '../../components/LoadSpinner/LoadSpinner.css'

interface LoadSpinnerProps {}

export const LoadSpinner: React.FC<LoadSpinnerProps> = ({}) => {
  return (
    <>
      {/* <div className='d-flex justify-content-center align-self-center mx-auto'> */}
      {/* <div className='center-spinner'> */}
      <div className='Spinner-wrapper'>
        {/* generated by https://loading.io/  */}
        <div className='ldio-cs9r5gg8z0w'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  )
}
