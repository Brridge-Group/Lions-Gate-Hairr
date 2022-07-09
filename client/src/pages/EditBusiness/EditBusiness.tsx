// React Components
import React, { useEffect, useState } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import BusinessImage from '../../UIElements/BusinessImage'

// Custom Imports
import { regions } from '../../constants/regions'

// 3rd Party Custom Imports
import axios from 'axios'
import '../AddBusiness/AddBusiness.css'
import '../Auth/UserRegistration/UserRegistration.css'

interface EditBusiness {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

// Custom Styles
interface EditBusiness {
  id: string
}

export const EditBusiness = () => {
  const history = useHistory()
  const location = useLocation<any>()
  const business = location.state
  // console.log('business', business)

  const [loading, setLoading] = useState(true)

  const [image, setImage] = useState<any | null>(null)

  // Initialize  Services and Features to state

  const [featuresArr, setFeaturesArr]: any = useState([])
  const [servicesArr, setServicesArr]: any = useState([])

  // Initialize state objects for form checkboxes
  const [isChecked, setIsChecked]: any = useState(false)
  const [isFeatsChecked, setIsFeatsChecked]: any = useState([])
  const [isServicesChecked, setIsServicesChecked]: any = useState([])

  const featuresArrTrue = business.features.map((bus: any) => bus._id)

  const [featsSelection, setFeatsSelection] = useState([...featuresArrTrue])

  const onFeatCheck = (featId: any) => {
    if (featsSelection.includes(featId)) {
      setFeatsSelection(featsSelection.filter(v => v !== featId))
    } else {
      setFeatsSelection([...featsSelection, featId])
    }
  }
  console.log(featsSelection, 'featsSelection')

  const servicesArrTrue = business.services.map((bus: any) => bus._id)

  const [servicesSelection, setServicesSelection] = useState([
    ...servicesArrTrue,
  ])

  const onServicesCheck = (serviceId: any) => {
    if (servicesSelection.includes(serviceId)) {
      setServicesSelection(servicesSelection.filter(v => v !== serviceId))
    } else {
      setServicesSelection([...servicesSelection, serviceId])
    }
  }
  console.log(servicesSelection, 'servicesSelection')

  useEffect(() => {
    const featuresArrTrue = business.features.map((bus: any) => bus._id)
    const fetchFeaturesData = async () => {
      try {
        const response = await fetch('/api/features', {
          method: 'GET',
        })
        const responseData = await response.json()
        const featsArr = responseData.map((el: any) => {
          let featsName = el.name
          let featsId = el._id
          let featsIsChecked = el.isChecked

          return [featsName, featsId, featsIsChecked]
        })
        for (let i = 0; i < featsArr.length; i++) {
          for (let j = 0; j < featuresArrTrue.length; j++) {
            if (featsArr[i][1] === featuresArrTrue[j]) {
              featsArr[i][2] = true
            }
          }
        }
        setFeaturesArr(featsArr)
      } catch (err: any) {
        console.log(err)
        setLoading(false)
      }
    }
    console.log(featuresArr, 'featuresArr')
    const servicesArrTrue = business.services.map((bus: any) => bus._id)

    const fetchServicesData = async () => {
      try {
        const response = await fetch('/api/services', {
          method: 'GET',
        })
        const responseData = await response.json()
        const servicesArr = responseData.map((el: any) => {
          let servicesName = el.name
          let servicesId = el._id
          let servicesIsChecked = el.isChecked

          return [servicesName, servicesId, servicesIsChecked]
        })
        for (let i = 0; i < servicesArr.length; i++) {
          for (let j = 0; j < servicesArrTrue.length; j++) {
            if (servicesArr[i][1] === servicesArrTrue[j]) {
              servicesArr[i][2] = true
            }
          }
        }
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
    businessName: business.businessName,
    description: business.description,
    email: business.email,
    address1: business.address.address1,
    address2: business.address.address2,
    image: business.image,
    city: business.address.city,
    postalCode: business.address.postalCode,
    region: business.address.region,
    country: business.address.country,
    phone: business.phone,
  })

  const [region, setRegion] = useState('AB')
  const [country, setCountry] = useState('Canada')

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
  useEffect(() => {
    const onFeatFormChange = () => {
      // console.log(e.target, 'e.target')
    }
    onFeatFormChange()
  }, [])

  const onFormChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegion = (e: any) => {
    setRegion(e.target.value)
  }

  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }

  const saveEditedBusiness = () => {
    // Add FeaturesArray and ServicesArray to data business form state object
    let editedBusiness = {
      ...formData,
      features: featsSelection,
      services: servicesSelection,
    }

    axios
      .patch(`/api/businesses/${business._id}`, editedBusiness)
      .then(response => {
        console.log(response.data)
        history.push('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = (e: any) => {
    console.log('hi')
    e.preventDefault()
    saveEditedBusiness()
  }

  return (
    <div className='FeatureContainer_image AddBusiness'>
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
                    <label htmlFor='city'>City / Town</label>
                  </h5>
                  <input
                    name='city'
                    type='text'
                    value={formData.city}
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
                    value={formData.region}
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
                    value={formData.country}
                    id='country'>
                    <option value='Canada'> Canada </option>
                    <option value='United States'> United States</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* //ts@ignore */}
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
                        alignItems: 'flex-start',
                      }}>
                      <input
                        type='checkbox'
                        name={`feature-${feature[0]}`}
                        id={feature[1]}
                        defaultChecked={feature[2]}
                        onChange={() => onFeatCheck(feature[1])}
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
                        alignItems: 'flex-start',
                      }}>
                      <input
                        type='checkbox'
                        name={`service-${service[0]}`}
                        id={service[1]}
                        defaultChecked={service[2]}
                        onChange={() => onServicesCheck(service[1])}
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
