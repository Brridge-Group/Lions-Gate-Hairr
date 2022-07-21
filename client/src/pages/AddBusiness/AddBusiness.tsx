//* React Imports
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

//* Custom Imports
import { BusinessImage } from '../../components/ImageFigure/BusinessImage'
import { regions } from '../../constants/regions'

//* Custom Styles
import './AddBusiness.css'
import '../Auth/UserRegistration/UserRegistration.css'

//* 3rd Party Custom Imports
import axios from 'axios'
import { toast } from 'react-toastify'

//* Types
interface AddBusiness {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

interface Business {
  businessName: string
  description: string
  email: string
  image: string
  phone: string
  address: {
    address1: string
    address2: string
    city: string
    country: string
    region: string
    postalCode: string
  }
  services: Service[]
  features: Feature[]
  reviews: Review[]
  stars: number
}

interface Service {
  _id: string
  isChecked: boolean
  name: string
}

interface Feature {
  _id: string
  isChecked: boolean
  name: string
}

interface Review {
  _id: string
  comment: string
  rating: number
}

export const AddBusiness = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [image, setImage] = useState<any | null>(null)

  //* Initialize Services and Features to State with full database data object
  const [feats, setFeats] = useState<Business['features'][]>([])
  const [services, setServices] = useState<Business['services'][]>([])

  //* Initialize Services and Features Arrays to State
  const [featuresArr, setFeaturesArr]: any[] = useState([])
  const [servicesArr, setServicesArr]: any[] = useState([])

  //* Initialize state objects for form checkboxes
  const [isChecked, setIsChecked]: any = useState(false)
  const [isFeatsChecked, setIsFeatsChecked]: any = useState([])
  const [isServicesChecked, setIsServicesChecked]: any = useState([])

  //* Fetch Services and Features from Database API Endpoint
  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const response = await fetch('/api/features', {
          method: 'GET',
        })
        setIsLoading(true)
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
        setIsLoading(false)
      }
      setIsLoading(false)
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
        setIsLoading(false)
      }
      setIsLoading(false)
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
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    cityTown: '',
    postalCode: '',
    phone: '',
  })
  const [region, setRegion] = useState('AB')
  const [country, setCountry] = useState('Canada')
  const history = useHistory()
  const ownerId = JSON.parse(localStorage.getItem('profile') ?? 'false').result._id

  const onImageChange = async (e: any) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      const maxFileSize = 2097067 // 2 mb
      const file = e.target.files[0]

      if (file.type.match('image.*')) {
        if (file.size > maxFileSize) {
          toast.error(`The selected image file size, ${file.size}kb, is too large. Please upload an image that is less than 2 mb.`)
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
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    //* Evaluate to determine if checkbox is checked and if is it a service or feature
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

    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //* Save to the businesses collection database all Services and Features set to true.
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

  //* Initialize business profile form state object
  const newBusinessProfileData = {
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
      country: country,
    },
    stars: 0,
    phone: formData.phone,
    ownerId: ownerId,
  }

  const saveNewBusiness = () => {
    //* Add FeaturesArray and ServicesArray to data business form state object
    let newBusiness = {
      ...newBusinessProfileData,
      features: savedFormFeats,
      services: savedFormServices,
    }

    axios
      .post('http://localhost:5000/api/businesses/add-business', newBusiness)
      .then(response => {
        history.push('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault()
    saveNewBusiness()
  }

  return (
    <div className='AddBusiness-Container_image FeatureContainer_image'>
      <main className='AddBusiness-Container FeatureContainer'>
        <form onSubmit={handleSubmit} className='AddBusiness-Form Form'>
          <section className='AddBusiness-FormCard'>
            <div className='AddBusiness-FormCard_body FormCard_body'>
              {/* Image Placeholder && Preview */}
              <BusinessImage pic={image} name={'profile-picture'} handleChange={onImageChange} />
              {/* <-- Form Starts --> */}
              <div className='AddBusiness-FormCard_body_formGroup'>
                <h5>
                  <label htmlFor='businessName'>Business Name</label>
                </h5>
                <input name='businessName' type='text' value={formData.businessName} onChange={onFormChange} required />
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <h5>
                  <label htmlFor='description'>Description</label>
                </h5>
                <textarea name='description' value={formData.description} onChange={onFormChange} required />
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <h5>
                  <label htmlFor='email'>Email</label>
                </h5>
                <input name='email' type='email' value={formData.email} onChange={onFormChange} required />
              </div>
              <div className='AddBusiness-FormCard_body_formGroup'>
                <h5>
                  <label htmlFor='address1'>Address Line 1</label>
                </h5>
                <input name='address1' type='text' value={formData.address1} onChange={onFormChange} required />
              </div>
              <div className='AddBusiness-FormCard_body_columns'>
                <div className='AddBusiness-FormCard_body_left'>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='address2'>Address Line 2</label>
                    </h5>
                    <input name='address2' type='text' value={formData.address2} onChange={onFormChange} />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='cityTown'>City / Town</label>
                    </h5>
                    <input name='cityTown' type='text' value={formData.cityTown} onChange={onFormChange} required />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='region'>Province / State</label>
                    </h5>
                    <select onChange={handleRegion} name='region' id='region'>
                      {regions.map(region => (
                        <option key={`${region}_${region.value}`} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='AddBusiness-FormCard_body_right'>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='postalCode'>Postal Code</label>
                    </h5>
                    <input name='postalCode' type='text' value={formData.postalCode} onChange={onFormChange} required />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='phone'>Phone Number</label>
                    </h5>
                    <input name='phone' type='text' value={formData.phone} onChange={onFormChange} required />
                  </div>
                  <div className='AddBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='country'>Country:</label>
                    </h5>
                    <select onChange={handleCountry} name='country' id='country'>
                      <option value='Canada'> Canada </option>
                      <option value='United States'> United States</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <aside className='AsideSidebar'>
            <div className='AsideSidebar-Container'>
              <h4 className='AsideSidebar-Header'>Features</h4>
              {/* <h4 className='AsideSidebar-Header'>
                <label htmlFor='features'>Features</label>
              </h4> */}
              <section className='AsideSidebar-FormGroup_section'>
                {featuresArr?.map((feature, index) => (
                  <div key={`${feature}_` + index}>
                    <h5
                      style={{
                        display: 'flex',
                        marginTop: '10px',
                        marginBottom: '5px',
                        alignItems: 'flex-start',
                      }}>
                      <input type='checkbox' name={`feature-${feature[0]}`} id={feature[1]} defaultChecked={feature[2]} onChange={onFormChange} />
                      <label htmlFor={feature[1]}>{feature[0]}</label>
                    </h5>
                  </div>
                ))}
              </section>
              <h4 className='AsideSidebar-Header'>Services</h4>
              {/* <h4 className='AsideSidebar-Header'>
                <label htmlFor='services'>Services</label>
              </h4> */}
              <section className='AsideSidebar-FormGroup_section'>
                {servicesArr?.map((service, index) => (
                  <div key={`${service}_` + index}>
                    <h5
                      style={{
                        display: 'flex',
                        marginTop: '10px',
                        marginBottom: '5px',
                        alignItems: 'flex-start',
                      }}>
                      <input type='checkbox' name={`service-${service[0]}`} id={service[1]} defaultChecked={service[2]} onChange={onFormChange} />
                      <label htmlFor={service[1]}>{service[0]}</label>
                    </h5>
                  </div>
                ))}
              </section>
            </div>
            <button type='submit' className='Btn-Primary' style={{ paddingTop: '0px' }}>
              Submit
            </button>
          </aside>
        </form>
        {/* <-- Form Ends --> */}
      </main>
    </div>
  )
}
