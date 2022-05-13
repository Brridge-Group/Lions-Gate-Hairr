// React Components
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

// Custom Imports
import ContentHeader from '../../components/ContentHeader'
import { regions } from '../../constants/regions'

// 3rd Party Custom Imports
import axios from 'axios'

// Custom Styles
import './AddBusiness.css'
export const AddBusiness = () => {
  // Initialize  Services and Features to state
  const [feats, setFeats]: any = useState([]) // Features full object
  const [services, setServices]: any = useState([]) // Services full object
  const [featuresArr, setFeaturesArr]: any = useState([])
  const [servicesArr, setServicesArr]: any = useState([])
  // Initialize state objects for form checkboxes
  const [isChecked, setIsChecked]: any = useState(false)
  const [isFeatsChecked, setIsFeatsChecked]: any = useState([])
  const [isServicesChecked, setIsServicesChecked]: any = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const response = await fetch('/api/features', {
          method: 'GET'
        })
        const responseData = await response.json()
        setFeats(responseData)
        const featsArr = responseData.map(el => {
          let featsName = el.name
          let featsId = el._id
          let featsIsChecked = el.isChecked

          return [featsName, featsId, featsIsChecked]
        })
        setFeaturesArr(featsArr)
      } catch (err: any) {
        console.log(err)
        setLoading(false)
      }
    }

    const fetchServicesData = async () => {
      try {
        const response = await fetch('/api/services', {
          method: 'GET'
        })
        const responseData = await response.json()
        setServices(responseData)
        const servicesArr = responseData.map(el => {
          let servicesName = el.name
          let servicesId = el._id
          let servicesIsChecked = el.isChecked

          return [servicesName, servicesId, servicesIsChecked]
        })
        setServicesArr(servicesArr)
      } catch (err: any) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchFeaturesData()
    fetchServicesData()
  }, [])

  // console.log(servicesArr)
  // console.log(featuresArr)

  //* TODO: Check form Inputs before commit then PR
  const [formData, setFormData]: any = useState({
    businessName: '',
    description: '',
    email: '',
    address1: '',
    address2: '',
    image: '',
    cityTown: '',
    postalCode: '',
    phone: ''
  })
  const [region, setRegion] = useState('AB')
  const [country, setCountry] = useState('Canada')
  const history = useHistory()
  const ownerId = JSON.parse(localStorage.getItem('profile') ?? 'false').result
    ._id

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegion = (e: any) => {
    setRegion(e.target.value)
  }

  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }
  const onFormChange = (event: any) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const data = {
    businessName: formData.businessName,
    description: formData.description,
    image:
      formData.image === ''
        ? 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
        : formData.image,
    email: formData.email,
    address: {
      address1: formData.address1,
      address2: formData.address2,
      postalCode: formData.postalCode,
      city: formData.cityTown,
      region: region,
      country: country
    },
    stars: 0,
    phone: formData.phone,
    ownerId: ownerId
  }

  axios
    .post('http://localhost:5000/api/businesses/add-business', data)
    .then(response => {
      // console.log(response.data)
      history.push('/')
    })
    .catch(error => {
      console.log(error)
    })

  return (
    <React.Fragment>
      <div className='AddBusiness-Wrapper'>
        <div className='AddBusiness-FormCard'>
          {/* <-- Form Start --> */}
          <form onSubmit={handleSubmit}>
            <div className='AddBusiness-FormCard_body'>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <label>Business Name</label>
                <input
                  name='businessName'
                  type='text'
                  value={formData.businessName}
                  className='AddBusiness-FormControl'
                  placeholder='Enter business name'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <label>Description</label>
                <textarea
                  name='description'
                  value={formData.description}
                  className='AddBusiness-FormControl'
                  placeholder='Enter business description'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <label>Email</label>
                <input
                  name='email'
                  type='email'
                  value={formData.email}
                  className='AddBusiness-FormControl'
                  placeholder='Enter email address'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <label>Address Line 1</label>
                <input
                  name='address1'
                  type='text'
                  value={formData.address1}
                  className='AddBusiness-FormControl'
                  placeholder='Enter street address'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='AddBusiness-FormCard_body_columns'>
                <div className='AddBusiness-FormCard_body_left'>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label>City / Town</label>
                    <input
                      name='cityTown'
                      type='text'
                      value={formData.cityTown}
                      className='AddBusiness-FormControl'
                      placeholder='Enter city'
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label>Province / State</label>
                    <select
                      className='custom-select rounded-0'
                      onChange={handleRegion}
                    >
                      {regions.map(region => (
                        <option value={region.value}>{region.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label>Phone Number</label>
                    <input
                      name='phone'
                      type='text'
                      value={formData.phone}
                      className='AddBusiness-FormControl'
                      placeholder='Enter phone number'
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label>Country:</label>
                    <select
                      className='custom-select rounded-0'
                      onChange={handleCountry}
                    >
                      <option value='Canada'> Canada </option>
                      <option value='United States'> United States</option>
                    </select>
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label>Image:</label>
                    <input
                      name='image'
                      type='text'
                      value={formData.image}
                      className='AddBusiness-FormControl'
                      placeholder='Enter the image link'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='AddBusiness-FormCard_body_right'>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label>Address Line 2</label>
                    <input
                      name='address2'
                      type='text'
                      value={formData.address2}
                      className='AddBusiness-FormControl'
                      placeholder='Enter street address 2'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label>Postal Code</label>
                    <input
                      name='postalCode'
                      type='text'
                      value={formData.postalCode}
                      className='AddBusiness-FormControl'
                      placeholder='Enter postal code'
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='AddBusiness-FormCard_sidebar'>
              <div className='AddBusiness-FormCard_filtersContainer'>
                <label
                  className=' AddBusiness-FormCard_filtersContainer_labelHeader'
                  htmlFor='features'
                >
                  Features
                </label>
                <div className='AddBusiness-FormCard_filtersContainer_formGroup'>
                  {featuresArr?.map((feature, index) => (
                    <div
                      className='AddBusiness-FormCard_filtersContainer_formCheck'
                      style={{ textTransform: 'capitalize' }}
                      key={`${feature}_` + index}
                    >
                      <input
                        className='AddBusiness-FormCard_filtersContainer_formCheckInput'
                        type='checkbox'
                        name={`feature-${feature[0]}`}
                        id={feature[1]}
                        defaultChecked={feature[2]}
                        onChange={onFormChange}
                      />
                      <label
                        className='AddBusiness-FormCard_filtersContainer_formCheckLabel'
                        htmlFor={feature[1]}
                      >
                        {feature[0]}
                      </label>
                    </div>
                  ))}
                </div>
                <label
                  className=' AddBusiness-FormCard_filtersContainer_labelHeader  AddBusiness-FormCard_filtersContainer_labelHeader_services'
                  htmlFor='services'
                >
                  Services
                </label>
                <div className='AddBusiness-FormCard_filtersContainer_formGroup'>
                  {servicesArr?.map((service, index) => (
                    <div
                      className='AddBusiness-FormCard_filtersContainer_formCheck'
                      style={{ textTransform: 'capitalize' }}
                      key={`${service}_` + index}
                    >
                      <input
                        className='AddBusiness-FormCard_filtersContainer_formCheckInput'
                        type='checkbox'
                        name={`service-${service[0]}`}
                        id={service[1]}
                        defaultChecked={service[2]}
                        onChange={onFormChange}
                      />
                      <label
                        className='AddBusiness-FormCard_filtersContainer_formCheckLabel'
                        htmlFor={service[1]}
                      >
                        {service[0]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className='AddBusiness-FormCard_sidebar_footer'>
                <button
                  type='submit'
                  className='AddBusiness-FormCard_sidebar_btn'
                >
                  submit
                </button>
              </div>
            </div>
          </form>
          {/* <-- Form Ends --> */}
        </div>
      </div>
    </React.Fragment>
  )
}