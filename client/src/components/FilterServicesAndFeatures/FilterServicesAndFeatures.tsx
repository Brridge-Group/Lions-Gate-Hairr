//* React Imports
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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  //* Initialize State Objects for Form Checkboxes
  const [isChecked, setIsChecked] = useState<boolean>(false)

  //* Initialize State Arrays for Selected Business Features and Services
  const [filteredFeats, setFilteredFeats]: any[] = useState([])
  const [filteredServices, setFilteredServices]: any[] = useState([])

  //* HandleChanges for the Selected Feature Checkboxes
  const onFeatChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, checked, id } = event.target

    const updatedFilteredFeats = filteredFeats.filter(feat => feat._id !== id)
    setFilteredFeats([...updatedFilteredFeats, { _id: id, isChecked: checked }])

    // console.log('id', id, 'checked', checked)
    // setFilteredFeats({ ...filteredFeats, [`${name} (${id})`]: checked })  // Used for Dev Testing
  }
  // console.log('filteredFeats onChange', filteredFeats)

  //* HandleChanges for the Selected Service Checkboxes
  const onServiceChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { name, checked, id } = event.target

    const updatedFilteredServices = filteredServices.filter(service => service._id !== id)
    setFilteredServices([...updatedFilteredServices, { _id: id, isChecked: checked }])

    // console.log('id', id, 'checked', checked)
    // setFilteredServices({ ...filteredServices, [`${name} (${id})`]: checked }) // Used for Dev Testing
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
    setIsLoading(false)
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
