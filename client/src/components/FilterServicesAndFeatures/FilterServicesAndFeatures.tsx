// React Components
import { useState, useEffect } from 'react'

// Custom Imports
import { LoadSpinner } from '../LoadSpinner/LoadSpinner'

// Custom Styles
import './FilterServicesAndFeatures.css'

// Types
interface Props {
  loading: boolean
  onFeatChange: any
  onServiceChange: any
  servicesArr: any
  featuresArr: any
  handleResetFilter: any
}

export const FilterServicesAndFeatures: React.FC<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  const [filteredFeats, setFilteredFeats]: any = useState([])
  const [filteredServices, setFilteredServices]: any = useState([])

  //* Filter Business Features and Services
  // HandleChanges for the features and services checkboxes
  const onFeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, id } = event.target
    // console.log('id', id, 'checked', checked)
    setFilteredFeats({ ...filteredFeats, [`${name} (${id})`]: checked })
  }
  // console.log('filteredFeats', filteredFeats)
  const onServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, id } = event.target
    // console.log('id', id, 'checked', checked)
    setFilteredServices({ ...filteredServices, [`${name} (${id})`]: checked })
  }
  // console.log('filteredServices', filteredServices)

  //* Monitor changes to the filtered features and services arrays. If there are changes send the data to the SearchResults component
  useEffect(() => {
    if (props.onFeatChange) {
      props.onFeatChange(filteredFeats)
      // console.log(filteredFeats)
    }
    if (props.onServiceChange) {
      props.onServiceChange(filteredServices)
      // console.log(filteredServices)
    }
  }, [filteredFeats, filteredServices])

  return (
    <>
      {!props.loading ? (
        <section className='Filters-Container'>
          <label htmlFor='features' className='Filters-Label_header'>
            Features
          </label>
          <div className='Filters-FormGroup'>
            {props.featuresArr?.map((feature, id, index) => (
              <div className='Filters-FormCheck' key={`${feature}_` + index}>
                <input className='Filters-FormCheckInput' type='checkbox' name={`feature-${feature[0]}`} id={feature[1]} defaultChecked={feature[2].isChecked} value={id} onChange={onFeatChange} />
                <label className='Filters-FormCheckLabel' htmlFor={feature[1]}>
                  {feature[0]}
                </label>
              </div>
            ))}
          </div>
          <label htmlFor='services' className='Filters-Label_header   Filters-Label_header_services'>
            Services
          </label>
          <div className='Filters-FormGroup'>
            {props.servicesArr?.map((service, id, index) => (
              <div className='Filters-FormCheck' key={`${service}_` + index}>
                <input className='Filters-FormCheckInput' type='checkbox' name={`service-${service[0]}`} id={service[1]} defaultChecked={service[2].isChecked} value={id} onChange={onServiceChange} />
                <label className='Filters-FormCheckLabel' htmlFor={service[1]}>
                  {service[0]}
                </label>
              </div>
            ))}
          </div>
          {/* TODO: BackLog => Connect to filterFunction */}
          {/* <button onClick={props.handleResetFilter}>Filter Results</button> */}
          <button className='Filters-Button' onClick={props.handleResetFilter}>
            reset Filters
          </button>
        </section>
      ) : (
        <>
          <section className='Filters-Container'>{isLoading && <LoadSpinner />}</section>
        </>
      )}
    </>
  )
}
