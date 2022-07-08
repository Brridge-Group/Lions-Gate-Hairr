// React Components
import React from 'react'

// Custom Styles
import '../../components/LoadSpinner/LoadSpinner.css'

interface LoadSpinnerProps {}

export const LoadSpinner: React.FC<LoadSpinnerProps> = ({}) => {
  return (
    <>
      <div className='Spinner-wrapper'>
        <div className='spinner'>
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
    </>
  )
}
