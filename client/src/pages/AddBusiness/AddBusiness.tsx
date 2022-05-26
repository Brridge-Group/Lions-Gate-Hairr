// React Components
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import BusinessImage from '../../UIElements/BusinessImage'

// Custom Imports
import { regions } from '../../constants/regions'

// 3rd Party Custom Imports
import axios from 'axios'
import './AddBusiness.css'
import '../Auth/UserRegistration/UserRegistration.css'

interface AddBusiness {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

// Custom Styles

export const AddBusiness = () => {
  const [loading, setLoading] = useState(true)

  const [image, setImage] = useState<any | null>(null)

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
          method: 'GET',
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
          method: 'GET',
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
    phone: '',
  })
  const [region, setRegion] = useState('AB')
  const [country, setCountry] = useState('Canada')
  const history = useHistory()
  const ownerId = JSON.parse(localStorage.getItem('profile') ?? 'false').result
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
          setImage(URL.createObjectURL(file))
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
        [e.target.name]: value,
      })

      if (e.target.name.includes('service')) {
        setIsServicesChecked({
          ...isServicesChecked,
          [e.target.id]: value,
        })
      }

      if (e.target.name.includes('feature')) {
        setIsFeatsChecked({
          ...isFeatsChecked,
          [e.target.id]: value,
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
    image: formData.image,
    email: formData.email,
    address: {
      address1: formData.address1,
      address2: formData.address2,
      postalCode: formData.postalCode,
      city: formData.cityTown,
      region: region,
      country: country,
    },
    stars: 0,
    phone: formData.phone,
    ownerId: ownerId,
  }

  const saveNewBusiness = () => {
    // Add FeaturesArray and ServicesArray to data business form state object
    let newBusiness = {
      ...data,
      features: savedFormFeats,
      services: savedFormServices,
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
    <div className='FeatureContainer_image Profile'>
      <div className='FeatureContainer'>
        {/* <-- Form Start --> */}

        <form onSubmit={handleSubmit} className='AddBusiness_inputGroup'>
          <div className='AddBusiness_scroll'>
            <div className='AddBusiness-FormCard_body'>
              <BusinessImage
                pic={image}
                name={'profile-picture'}
                handleChange={onImageChange}
              />
              <h5>
                <label htmlFor='businessName'>Business Name</label>
              </h5>
              <input
                name='businessName'
                type='text'
                value={formData.businessName}
                className='UserRegistration_input'
                onChange={onFormChange}
                required
              />
              <h5>
                <label htmlFor='description'>Description</label>
              </h5>
              <textarea
                name='description'
                value={formData.description}
                className='UserRegistration_input'
                onChange={onFormChange}
                required
              />
              <h5>
                <label htmlFor='email'>Email</label>
              </h5>
              <input
                name='email'
                type='email'
                value={formData.email}
                className='UserRegistration_input'
                onChange={onFormChange}
                required
              />
              <h5>
                <label htmlFor='address1'>Address Line 1</label>
              </h5>
              <input
                name='address1'
                type='text'
                value={formData.address1}
                className='UserRegistration_input color'
                onChange={onFormChange}
                required
              />

              <div className='AddBusiness-FormCard_body_columns'>
                <div className='AddBusiness-FormCard_body_left'>
                  <h5>
                    <label htmlFor='cityTown'>City / Town</label>
                  </h5>
                  <input
                    name='cityTown'
                    type='text'
                    value={formData.cityTown}
                    className='UserRegistration_input color'
                    onChange={onFormChange}
                    required
                  />
                  <h5>
                    <label htmlFor='region'>Province / State</label>
                  </h5>
                  <select
                    className='UserRegistration_input color'
                    onChange={handleRegion}
                    name='region'
                    id='region'>
                    {regions.map(region => (
                      <option value={region.value}>{region.label}</option>
                    ))}
                  </select>
                  <h5>
                    <label htmlFor='phone'>Phone Number</label>
                  </h5>
                  <input
                    name='phone'
                    type='text'
                    value={formData.phone}
                    className='UserRegistration_input color'
                    onChange={onFormChange}
                    required
                  />
                </div>
                <div className='AddBusiness-FormCard_body_right'>
                  <h5>
                    <label htmlFor='address2'>Address Line 2</label>
                  </h5>

                  <input
                    name='address2'
                    type='text'
                    value={formData.address2}
                    className='UserRegistration_input color'
                    onChange={onFormChange}
                  />

                  <h5>
                    <label htmlFor=''>Postal Code</label>
                  </h5>

                  <input
                    name='postalCode'
                    type='text'
                    value={formData.postalCode}
                    className='UserRegistration_input color'
                    onChange={onFormChange}
                    required
                  />

                  <h5>
                    <label htmlFor='country'>Country:</label>
                  </h5>
                  <select
                    className='UserRegistration_input color'
                    onChange={handleCountry}
                    name='country'
                    id='country'>
                    <option value='Canada'> Canada </option>
                    <option value='United States'> United States</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='AddBusiness-FormCard_sidebar'>
            <div className='AddBusiness-FormCard_filtersContainer'>
              <h4 className='sidebar-hed'>
                <label htmlFor='features'>Features</label>
              </h4>
              <div className='AddBusiness-FormCard_filtersContainer_formGroup'>
                {featuresArr?.map((feature, index) => (
                  <div key={`${feature}_` + index}>
                    <h5
                      style={{
                        display: 'flex',
                        marginTop: '10px',
                        marginBottom: '5px',
                      }}>
                      <input
                        type='checkbox'
                        name={`feature-${feature[0]}`}
                        id={feature[1]}
                        defaultChecked={feature[2]}
                        onChange={onFormChange}
                      />
                      <label htmlFor={feature[1]}>{feature[0]}</label>
                    </h5>
                  </div>
                ))}
              </div>
              <h4 className='sidebar-hed'>
                <label htmlFor='features'>Services</label>
              </h4>
              <div className='AddBusiness-FormCard_filtersContainer_formGroup'>
                {servicesArr?.map((service, index) => (
                  <div key={`${service}_` + index}>
                    <h5
                      style={{
                        display: 'flex',
                        marginTop: '10px',
                        marginBottom: '5px',
                      }}>
                      <input
                        type='checkbox'
                        name={`service-${service[0]}`}
                        id={service[1]}
                        defaultChecked={service[2]}
                        onChange={onFormChange}
                      />
                      <label htmlFor={service[1]}>{service[0]}</label>
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            <button
              type='submit'
              className='btn--btn-primary'
              style={{ paddingTop: '0px' }}>
              submit
            </button>
          </div>
        </form>
        {/* <-- Form Ends --> */}
      </div>
    </div>
  )
}
