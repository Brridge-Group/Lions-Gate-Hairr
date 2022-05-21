// React Components
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

// Custom Imports
import { regions } from '../../constants/regions'

// 3rd Party Custom Imports
import axios from 'axios'
import Button from '@material-ui/core/Button'

// Custom Styles
import './AddBusiness.css'

export const AddBusiness = () => {
  const [loading, setLoading] = useState(true)

  // Initialize  Services and Features to state
  const [feats, setFeats]: any = useState([]) // Features full object
  const [services, setServices]: any = useState([]) // Services full object
  const [featuresArr, setFeaturesArr]: any = useState([])
  const [servicesArr, setServicesArr]: any = useState([])

  // Initialize state objects for form checkboxes
  const [isChecked, setIsChecked]: any = useState(false)
  const [isFeatsChecked, setIsFeatsChecked]: any = useState([])
  const [isServicesChecked, setIsServicesChecked]: any = useState([])

  // Fetch Services and Features from Database API Endpoint
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
  const ownerId = JSON.parse(localStorage.getItem('profile') ?? 'false').data.result
    ._id

  const onImageChange = async (e: any) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const maxFileSize = 2097067 // 2 mb
      const file = e.target.files[0]

      if (file.type.match('image.*')) {
        if (file.size > maxFileSize) {
          toast.error(
            `The selected image file size, ${file.size}kb, is too large. Please upload an image that is less than 2 mb.`
          )
        } else {
          let base64 = (await new Promise(resolve => {
            let reader = new FileReader()
            reader.onload = e => {
              resolve(e.target?.result as any)
            }
            reader.readAsDataURL(file)
          })) as string
          setFormData({ ...formData, [e.target.name]: base64 })
        }
      } else {
        toast.error('Error: file is not a image. It should be png/jpeg file.')
      }
    }
  }
  const onFormChange = (e: any) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value

    // Evaluate to determine if checkbox is checked and if is it a service or feature
    if (e.target.type === 'checkbox') {
      setIsChecked({
        ...isChecked,
        [e.target.name]: value
      })

      if (e.target.name.includes('service')) {
        setIsServicesChecked({
          ...isServicesChecked,
          [e.target.id]: value
        })
      }

      if (e.target.name.includes('feature')) {
        setIsFeatsChecked({
          ...isFeatsChecked,
          [e.target.id]: value
        })
      }
    }
    console.log(value)

    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Save to the businesses collection database all features and services set to true.
  let savedFormFeats = Object.entries(isFeatsChecked)
    .map(key => {
      if (key[1] === true) {
        return [key[0]]
      }
    })
    .filter(el => {
      if (el !== undefined) {
      }
      return el
    })

  let savedFormServices = Object.entries(isServicesChecked)
    .map(key => {
      if (key[1] === true) {
        return [key[0]]
      }
    })
    .filter(el => {
      if (el !== undefined) {
      }
      return el
    })

  const handleRegion = (e: any) => {
    setRegion(e.target.value)
  }

  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }

  // Initialize business profile form state object
  const data = {
    businessName: formData.businessName,
    description: formData.description,
    image:
      formData.image === ' '
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

  const saveNewBusiness = () => {
    // Add FeaturesArray and ServicesArray to data business form state object
    let newBusiness = {
      ...data,
      features: savedFormFeats,
      services: savedFormServices
    }
  
    axios
      .post('http://localhost:5000/api/businesses/add-business', newBusiness)
      .then(response => {
        console.log(response.data)
        history.push('/')
      })
      .catch(error => {
        console.log(error)
      }) 
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    saveNewBusiness()
  }

  return (
    <React.Fragment>
      <div className='AddBusiness-Wrapper'>
        <div className='AddBusiness-FormCard'>
          {/* <-- Form Start --> */}
          <form onSubmit={handleSubmit}>
            <div className='AddBusiness-FormCard_body'>
              <div className='AddBusiness-FormCard_body_formGroup AddBusiness-FormCard_preview_container'>
                {/* Image Placeholder && Preview */}
                <figure className='AddBusiness-FormCard_image_preview'>
                  <img
                    src={
                      formData.image === ''
                        ? 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
                        : formData.image
                    }
                    alt='Example of a business'
                    height='100px'
                  />
                  <label htmlFor='select-image'>
                    <Button
                      className='AddBusiness-FormCard_image_btn'
                      component='span'
                      style={{
                        background: '#000',
                        color: '#fff',
                        width: '9rem',
                        border: '1px solid #f32dc8',
                        height: '2.5rem',
                        textTransform: 'lowercase'
                      }}
                    >
                      {formData.image === '' ? 'Select Image' : 'Change Image'}
                    </Button>
                  </label>
                  <input
                    name='image'
                    accept='image/*'
                    type='file'
                    id='select-image'
                    style={{ display: 'none' }}
                    onChange={onImageChange}
                  />
                </figure>
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <label htmlFor='businessName'>Business Name</label>
                <input
                  name='businessName'
                  type='text'
                  value={formData.businessName}
                  className='AddBusiness-FormControl'
                  placeholder='Enter business name'
                  onChange={onFormChange}
                  required
                />
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <label htmlFor='description'>Description</label>
                <textarea
                  name='description'
                  value={formData.description}
                  className='AddBusiness-FormControl'
                  placeholder='Enter business description'
                  onChange={onFormChange}
                  required
                />
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <label htmlFor='email'>Email</label>
                <input
                  name='email'
                  type='email'
                  value={formData.email}
                  className='AddBusiness-FormControl'
                  placeholder='Enter email address'
                  onChange={onFormChange}
                  required
                />
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <label htmlFor='address1'>Address Line 1</label>
                <input
                  name='address1'
                  type='text'
                  value={formData.address1}
                  className='AddBusiness-FormControl'
                  placeholder='Enter street address'
                  onChange={onFormChange}
                  required
                />
              </div>
              <div className='AddBusiness-FormCard_body_columns'>
                <div className='AddBusiness-FormCard_body_left'>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label htmlFor='cityTown'>City / Town</label>
                    <input
                      name='cityTown'
                      type='text'
                      value={formData.cityTown}
                      className='AddBusiness-FormControl'
                      placeholder='Enter city'
                      onChange={onFormChange}
                      required
                    />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label htmlFor='region'>Province / State</label>
                    <select
                      className='custom-select rounded-0'
                      onChange={handleRegion}
                      name='region'
                      id='region'
                    >
                      {regions.map(region => (
                        <option value={region.value}>{region.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                      name='phone'
                      type='text'
                      value={formData.phone}
                      className='AddBusiness-FormControl'
                      placeholder='Enter phone number'
                      onChange={onFormChange}
                      required
                    />
                  </div>
                </div>
                <div className='AddBusiness-FormCard_body_right'>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label htmlFor='address2'>Address Line 2</label>
                    <input
                      name='address2'
                      type='text'
                      value={formData.address2}
                      className='AddBusiness-FormControl'
                      placeholder='Enter street address 2'
                      onChange={onFormChange}
                    />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label htmlFor=''>Postal Code</label>
                    <input
                      name='postalCode'
                      type='text'
                      value={formData.postalCode}
                      className='AddBusiness-FormControl'
                      placeholder='Enter postal code'
                      onChange={onFormChange}
                      required
                    />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <label htmlFor='country'>Country:</label>
                    <select
                      className='custom-select rounded-0'
                      onChange={handleCountry}
                      name='country'
                      id='country'
                    >
                      <option value='Canada'> Canada </option>
                      <option value='United States'> United States</option>
                    </select>
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
