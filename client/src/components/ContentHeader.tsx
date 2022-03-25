import React from 'react'

type Props = {
  title: string
}

export const ContentHeader: React.FC<Props> = (props: Props) => {
  console.log('contentheader', props.title)
  return (
    <>
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0'>{props.title}</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'></ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
