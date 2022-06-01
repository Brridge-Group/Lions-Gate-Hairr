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
  const [isLoading, setIsLoading]: any = useState(true)

  const [filteredFeats, setFilteredFeats]: any = useState([])
  const [filteredServices, setFilteredServices]: any = useState([])

  //* Filter Business Features and Services
  // HandleChanges for the features and services checkboxes
  const onFeatChange = event => {
    const { name, checked, id } = event.target
    // console.log('id', id, 'checked', checked)
    setFilteredFeats({ ...filteredFeats, [`${name} (${id})`]: checked })
  }
  // console.log('filteredFeats', filteredFeats)
  const onServiceChange = event => {
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
        <>
          <section className='Filters'>
            <h4 className='sidebar-hed'>
              <label htmlFor='features'>Features</label>
            </h4>
            <div className='Filters-FormGroup features'>
              {props.featuresArr?.map((feature, id, index) => (
                <h5
                  key={`${feature}_` + index}
                  style={{
                    display: 'flex',
                    marginTop: '10px',
                    marginBottom: '5px',
                  }}>
                  <input
                    type='checkbox'
                    name={`feature-${feature[0]}`}
                    id={feature[1]}
                    defaultChecked={feature[2].isChecked}
                    value={id}
                    onChange={onFeatChange}
                  />
                  <label htmlFor={feature[1]}>{feature[0]}</label>
                </h5>
                // </div>
              ))}
            </div>
            <h4 className='sidebar-hed'>
              <label htmlFor='services'>Services</label>
            </h4>
            <div className='Filters-FormGroup services'>
              {props.servicesArr?.map((service, id, index) => (
                <h5
                  key={`${service}_` + index}
                  style={{
                    display: 'flex',
                    marginTop: '10px',
                    marginBottom: '5px',
                  }}>
                  <input
                    type='checkbox'
                    name={`service-${service[0]}`}
                    id={service[1]}
                    defaultChecked={service[2].isChecked}
                    value={id}
                    onChange={onServiceChange}
                  />
                  <label
                    className='Filters-FormCheckLabel'
                    htmlFor={service[1]}>
                    {service[0]}
                  </label>
                </h5>
              ))}
            </div>
          </section>
          {/* TODO: BackLog => Connect to filterFunction */}
          <div className='Filters-buttons'>
            <button
              className='btn--btn-primary filter'
              onClick={props.handleResetFilter}>
              Filter Results
            </button>
            <button
              className='btn--btn-primary filter'
              onClick={props.handleResetFilter}>
              reset Filters
            </button>
          </div>
        </>
      ) : (
        <section className='Filters-Container'>
          {isLoading && <LoadSpinner />}
        </section>
      )}
    </>
  )
}
