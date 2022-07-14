//* React Components
import { useState, useEffect } from 'react'

//* Custom Imports
import { LoadSpinner } from '../LoadSpinner/LoadSpinner'

//* Custom Styles
import './FilterServicesAndFeatures.css'

//* Types
interface Props {
  list: any
  isLoading: boolean
  onFeatChange: any
  onServiceChange: any
  servicesArr: any
  featuresArr: any
  setFeaturesArr: any
  setServicesArr: any
  filteredResults: any
  setFilteredResults: any
  handleFilteredResults: any
}

interface ObjectCheckboxes {
  [key: string]: any
}

export const FilterServicesAndFeatures = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  //* Initialize State Objects for Form Checkboxes
  const [isChecked, setIsChecked]: any = useState(false)
  //* Initialize Arrays for Selected Business Features and Services
  const [filteredFeats, setFilteredFeats]: any = useState([])
  const [filteredServices, setFilteredServices]: any = useState([])

  //* HandleChanges for the Selected Features and Services Checkboxes
  const onFeatChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, checked, id } = event.target
    // console.log('id', id, 'checked', checked)
    setIsChecked(!isChecked)
    // setFilteredFeats({ ...filteredFeats, [`${name} (${id})`]: checked })
    setFilteredFeats({ ...filteredFeats, [`${id}`]: checked })
  }
  // console.log('filteredFeats onChange', filteredFeats)

  const onServiceChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, checked, id } = event.target
    // console.log('id', id, 'checked', checked)
    setIsChecked(!isChecked)
    // setFilteredServices({ ...filteredServices, [`${name} (${id})`]: checked })
    setFilteredServices({ ...filteredServices, [`${id}`]: checked })
  }
  // console.log('filteredServices onChange', filteredServices)
  const handleResetFilter = (): any => {
    //* Create an object of checkboxes
    let objectCheckboxes = document.getElementsByClassName('Filters-FormCheckInput')

    setIsChecked(!isChecked)

    if (!objectCheckboxes) return

    if (objectCheckboxes.length > 0) {
      //* Loop through the object of checkboxes
      Object.values(objectCheckboxes).forEach(checkbox => {
        //* Set Checkboxes to false
        let a = checkbox as HTMLInputElement
        a.checked = false
      })
    }

    //* Reset `filteredFeats` state object to the initial state of an empty array though later set inside an object.
    setFilteredFeats(filteredFeats => {
      return (filteredFeats = [])
    })

    //* Reset `filteredServices` state object to the initial state an empty array though later set inside an object.
    setFilteredServices(filteredServices => {
      return (filteredServices = [])
    })

    //* Reset `filteredResults` state object to the initial state, Business List filtered by City.
    props.setFilteredResults(() => {
      return [...props.list]
    })
  }

  //* Monitor changes to the filtered Features and Services arrays. If there are changes send the data to the `BusinessList` Parent component
  useEffect(() => {
    if (props.onFeatChange) {
      props.onFeatChange(filteredFeats)
      // console.log('filteredFeats useEffect changes', filteredFeats)
    }
    props.onFeatChange(filteredFeats)
    if (props.onServiceChange) {
      props.onServiceChange(filteredServices)
      // console.log('filteredServices useEffect changes', filteredServices)
    }
    props.onServiceChange(filteredServices)
  }, [filteredFeats, filteredServices])

  return (
    <>
      {!props.isLoading ? (
        <aside className='Filters-Container'>
          <h4 className='Filters-Label_header'>
            <label htmlFor='features' className='Filters-FormCheckLabel'>
              Features
            </label>
          </h4>
          <section className='Filters-FormGroup Filters-FormGroup_features'>
            {/* Feature Checkboxes */}
            {props.featuresArr?.map((feature, id, index) => (
              <div className='Filters-FormCheck' key={`${feature}_` + index}>
                <input
                  className='Filters-FormCheckInput'
                  type='checkbox'
                  name={`feature-${feature[0]}`}
                  value={id}
                  id={feature[1]}
                  // defaultChecked={feature[2].isChecked}
                  checked={isChecked[index]}
                  onChange={onFeatChange}
                />
                {/* Feature Checkbox Labels */}
                <h5 className='Filters-FormCheckLabel_header'>
                  <label className='Filters-FormCheckLabel' htmlFor={feature[1]}>
                    {feature[0]}
                  </label>
                </h5>
              </div>
            ))}
          </section>
          <h4 className='Filters-Label_header'>
            <label htmlFor='services' className='Filters-Label_header_services'>
              Services
            </label>
          </h4>
          <section className='Filters-FormGroup Filters-FormGroup_services'>
            {/* Service Checkboxes */}
            {props.servicesArr?.map((service, id, index) => (
              <div className='Filters-FormCheck' key={`${service}_` + index}>
                <input
                  className='Filters-FormCheckInput'
                  type='checkbox'
                  name={`service-${service[0]}`}
                  value={id}
                  id={service[1]}
                  // defaultChecked={service[2].isChecked}
                  checked={isChecked[index]}
                  onChange={onServiceChange}
                />
                <h5 className='Filters-FormCheckLabel_header'>
                  {/** Service Checkbox Labels  */}
                  <label className='Filters-FormCheckLabel' htmlFor={service[1]}>
                    {service[0]}
                  </label>
                </h5>
              </div>
            ))}
          </section>
          <div className='Filters-Buttons'>
            <button className='Filter-Button Btn-Primary' onClick={props.handleFilteredResults}>
              Filter Results
            </button>
            <button className='Reset-Button Btn-Primary' onClick={handleResetFilter}>
              Reset Filters
            </button>
          </div>
        </aside>
      ) : (
        <aside className='Filters-Container'>{isLoading && <LoadSpinner />}</aside>
      )}
    </>
  )
}
