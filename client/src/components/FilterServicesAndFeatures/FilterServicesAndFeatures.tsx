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
  handleFilteredResults: any
}

export const FilterServicesAndFeatures = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  //* Initialize Arrays for Selected Business Features and Services
  const [filteredFeats, setFilteredFeats]: any = useState([])
  const [filteredServices, setFilteredServices]: any = useState([])

  //* HandleChanges for the Selected Features and Services Checkboxes
  const onFeatChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, checked, id } = event.target
    // console.log('id', id, 'checked', checked)
    // setFilteredFeats({ ...filteredFeats, [`${name} (${id})`]: checked })
    setFilteredFeats({ ...filteredFeats, [`${id}`]: checked })
  }
  // console.log('filteredFeats onChange', filteredFeats)

  const onServiceChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, checked, id } = event.target
    // console.log('id', id, 'checked', checked)
    // setFilteredServices({ ...filteredServices, [`${name} (${id})`]: checked })
    setFilteredServices({ ...filteredServices, [`${id}`]: checked })
  }
  // console.log('filteredServices onChange', filteredServices)

  //* Monitor changes to the filtered Features and Services arrays. If there are changes send the data to the `BusinessList` Parent component
  useEffect(() => {
    if (props.onFeatChange) {
      props.onFeatChange(filteredFeats)
      // console.log('filteredFeats useEffect changes', filteredFeats)
    }
    if (props.onServiceChange) {
      props.onServiceChange(filteredServices)
      // console.log('filteredServices useEffect changes', filteredServices)
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
                    alignItems: 'flex-start',
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
                    alignItems: 'flex-start',
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
              onClick={props.handleFilteredResults}>
              Filter Results
            </button>
            <button
              className='btn--btn-primary filter'
              onClick={props.handleResetFilter}>
              Reset Filters
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
