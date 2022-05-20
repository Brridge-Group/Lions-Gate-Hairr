// React Components
import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

// Custom Imports
// import ContentHeader from '../components/ContentHeader'

// 3rd Party Custom Imports
import axios from 'axios'
import { toast } from 'react-toastify'
import { regions } from '../constants/regions'

// Custom Styles
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import './AddBusiness.css'

export const AddBusiness = () => {
  const [imageUrl, setImageUrl] = useState(null)
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

  const [formData, setFormData]: any = useState({
    name: '',
    description: '',
    image: '',
    street: '',
    postalCode: '',
    city: '',
    phone: ''
  })
  const [region, setRegion] = useState('AB')
  const [country, setCountry] = useState('Canada')
  const history = useHistory()
  const ownerId = JSON.parse(localStorage.getItem('profile') || '{}').data
    .result._id

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log('LIne 85: ', JSON.stringify(formData))
  }

  const onImageChange = async (e: any) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const maxFileSize = 2097067 // 2 mb
      const file = e.target.files[0]

      if (file.type.match('image.*')) {
        if (file.size > maxFileSize) {
          toast.error(
            `File size is too large ${file.size}kb. Please upload image less than 2 mb.`
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
    name: formData.name,
    description: formData.description,
    image: formData.image,
    address: {
      street: formData.street,
      postalCode: formData.postalCode,
      city: formData.city,
      region: region,
      country: country
    },
    stars: 5,
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
      <div className='content-wrapper'>
        <div className='card w-50 mx-auto'>
          <div className='card-header'>
            <h3 className='card-title'>Add New Business</h3>
          </div>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Name:</label>
                <input
                  name='name'
                  type='text'
                  value={formData.name}
                  className='form-control'
                  placeholder='Enter business name'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Description:</label>
                <br />
                <textarea
                  name='description'
                  value={formData.description}
                  className='form-control'
                  placeholder='Enter business description'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Phone:</label>
                <input
                  name='phone'
                  type='text'
                  value={formData.phone}
                  className='form-control'
                  placeholder='Enter phone number'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                {/* <label>Image:</label>
                <input name='image' type='text' value={formData.image} className='form-control' placeholder='Enter image url' onChange={handleChange} required /> */}
                <label htmlFor='select-image'>
                  <Button variant='contained' color='primary' component='span'>
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
                  required
                />
                {formData.image && (
                  <Box mt={2} textAlign='center'>
                    <div>Image Preview:</div>
                    <img
                      src={formData.image}
                      alt='Example of a business'
                      height='100px'
                    />
                  </Box>
                )}
              </div>
              <br />
              <h4>Address</h4>
              <div className='form-group'>
                <label>Street:</label>
                <input
                  name='street'
                  type='text'
                  value={formData.street}
                  className='form-control'
                  placeholder='Enter street address'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Postal Code:</label>
                <input
                  name='postalCode'
                  type='text'
                  value={formData.postalCode}
                  className='form-control'
                  placeholder='Enter postal code'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>City:</label>
                <input
                  name='city'
                  type='text'
                  value={formData.city}
                  className='form-control'
                  placeholder='Enter city'
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Province / State:</label>
                <select
                  className='custom-select rounded-0'
                  onChange={handleRegion}
                >
                  {regions.map(region => (
                    <option value={region.value}>{region.label}</option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label>Country:</label>
                <select
                  className='custom-select rounded-0'
                  onChange={handleCountry}
                >
                  <option value='Canada'> Canada </option>
                  <option value='United States'> United States</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='features'>Features</label>

                {featuresArr?.map((feature, index) => (
                  <div
                    className='form-check'
                    style={{ textTransform: 'capitalize' }}
                    key={`${feature}_` + index}
                  >
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name={`feature-${feature[0]}`}
                      id={feature[1]}
                      defaultChecked={feature[2]}
                      onChange={onFormChange}
                    />
                    <label className='form-check-label' htmlFor={feature[1]}>
                      {feature[0]}
                    </label>
                  </div>
                ))}
              </div>
              <div className='form-group'>
                <label htmlFor='services'>Services</label>
                {servicesArr?.map((service, index) => (
                  <div
                    className='form-check'
                    style={{ textTransform: 'capitalize' }}
                    key={`${service}_` + index}
                  >
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name={`service-${service[0]}`}
                      id={service[1]}
                      defaultChecked={service[2]}
                      onChange={onFormChange}
                    />
                    <label className='form-check-label' htmlFor={service[1]}>
                      {service[0]}
                    </label>
                  </div>
                ))}
              </div>
              <div className='card-footer'>
                <button type='submit' className='btn btn-primary'>
                  Add
                </button>{' '}
                <Link to='/' className='btn btn-secondary'>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
