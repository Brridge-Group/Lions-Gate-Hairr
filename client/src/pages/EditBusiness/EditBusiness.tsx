//* React Imports
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

//* Custom Imports
import { regions } from '../../constants/regions'
import { BusinessImage } from '../../components/ImageFigure/BusinessImage'

//* Custom Styles
import '../EditBusiness/EditBusiness.css'
import '../Auth/UserRegistration/UserRegistration.css'

//* 3rd Party Custom Imports
import axios from 'axios'
import { toast } from 'react-toastify'

//* Types
interface EditBusiness {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

interface EditBusiness {
  id: string
}

export const EditBusiness = () => {
  const history = useHistory()
  const location = useLocation<any>()
  const business = location.state
  console.log('business', business)

  const [image, setImage] = useState<any | null>(null)

  const [featuresArr, setFeaturesArr]: any = useState([])
  const [servicesArr, setServicesArr]: any = useState([])

  const featuresArrTrue = business.features.map((bus: any) => bus._id)
  const [featsSelection, setFeatsSelection] = useState([...featuresArrTrue])

  const onFeatCheck = (featId: any) => {
    if (featsSelection.includes(featId)) {
      setFeatsSelection(featsSelection.filter(feat => feat !== featId))
    } else {
      setFeatsSelection([...featsSelection, featId])
    }
  }
  // console.log(featsSelection, 'featsSelection')

  const servicesArrTrue = business.services.map((bus: any) => bus._id)
  const [servicesSelection, setServicesSelection] = useState([...servicesArrTrue])

  const onServicesCheck = (serviceId: any) => {
    if (servicesSelection.includes(serviceId)) {
      setServicesSelection(servicesSelection.filter(service => service !== serviceId))
    } else {
      setServicesSelection([...servicesSelection, serviceId])
    }
  }
  // console.log(servicesSelection, 'servicesSelection')

  useEffect(() => {
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
      }
    }

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
      }
    }
    fetchFeaturesData()
    fetchServicesData()
  }, [])

  const [formData, setFormData]: any = useState({
    businessName: business.businessName,
    description: business.description,
    image: business.image,
    email: business.email,
    address: {
      address1: business.address.address1,
      address2: business.address.address2,
      postalCode: business.address.postalCode,
      city: business.address.city,
      region: business.address.region,
      country: business.address.country,
    },
    phone: business.phone,
  })

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
  const onFormFirstChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onFormChange = (address: any) => (e: any) => {
    setFormData({
      ...formData,
      [address]: {
        ...formData[address],
        [e.target.name]: e.target.value,
      },
    })
  }

  // const onFormChange = (address: any) => (e: any) => {
  //   if (!address) {
  //     setFormData({ ...formData, [e.target.name]: e.target.value })
  //   } else
  //     setFormData({
  //       ...formData,
  //       [address]: {
  //         ...formData[address],
  //         [e.target.name]: e.target.value,
  //       },
  //     })
  // }

  const saveEditedBusiness = () => {
    let editedBusiness = {
      ...formData,
      features: featsSelection,
      services: servicesSelection,
    }
    // console.log('editedBusiness', editedBusiness)

    axios
      .patch(`/api/businesses/${business._id}`, editedBusiness)
      .then(response => {
        console.log(response.data)
        history.goBack()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    saveEditedBusiness()
  }

  return (
    <div className='EditBusiness-Container_image FeatureContainer_image'>
      <main className='EditBusiness-Container FeatureContainer'>
        <form onSubmit={handleSubmit} className='EditBusiness-Form Form'>
          <section className='EditBusiness-FormCard'>
            <div className='EditBusiness-FormCard_body FormCard_body'>
              {/* Image Placeholder && Preview */}
              <BusinessImage pic={image} name={'profile-picture'} handleChange={onImageChange} />
              {/* <-- Form Starts --> */}
              <div className='EditBusiness-FormCard_body_formGroup'>
                <h5>
                  <label htmlFor='businessName'>Business Name</label>
                </h5>
                <input name='businessName' type='text' value={formData.businessName} onChange={onFormFirstChange} required />
              </div>
              <div className='EditBusiness-FormCard_body_formGroup'>
                <h5>
                  <label htmlFor='description'>Description</label>
                </h5>
                <textarea name='description' value={formData.description} onChange={onFormFirstChange} required />
              </div>
              <div className='EditBusiness-FormCard_body_formGroup'>
                <h5>
                  <label htmlFor='email'>Email</label>
                </h5>
                <input name='email' type='email' value={formData.email} onChange={onFormChange} required />
              </div>
              <div className='EditBusiness-FormCard_body_formGroup'>
                <h5>
                  <label htmlFor='address1'>Address Line 1</label>
                </h5>
                <input name='address1' type='text' value={formData.address.address1} onChange={onFormChange('address')} required />
              </div>
              <div className='EditBusiness-FormCard_body_columns'>
                <div className='EditBusiness-FormCard_body_left'>
                  <div className='EditBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='address2'>Address Line 2</label>
                    </h5>
                    <input name='address2' type='text' value={formData.address.address2} onChange={onFormChange('address')} />
                  </div>
                  <div className='EditBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='city'>City / Town</label>
                    </h5>
                    <input name='city' type='text' value={formData.address.city} onChange={onFormChange('address')} required />
                  </div>
                  <div className='EditBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='region'>Province / State</label>
                    </h5>
                    <select onChange={onFormChange('address')} name='region' value={formData.address.region} id='region'>
                      {regions.map(region => (
                        <option key={`${region}_${region.value}`} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='EditBusiness-FormCard_body_right'>
                  <div className='EditBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='postalCode'>Postal Code</label>
                    </h5>
                    <input name='postalCode' type='text' value={formData.address.postalCode} onChange={onFormChange('address')} required />
                  </div>
                  <div className='EditBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='phone'>Phone Number</label>
                    </h5>
                    <input name='phone' type='text' value={formData.phone} onChange={onFormFirstChange} required />
                  </div>
                  <div className='EditBusiness-FormCard_body_formGroup'>
                    <h5>
                      <label htmlFor='country'>Country:</label>
                    </h5>
                    <select onChange={onFormChange('address')} name='country' value={formData.address.country} id='country'>
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
                      <input type='checkbox' name={`feature-${feature[0]}`} id={feature[1]} defaultChecked={feature[2]} onChange={() => onFeatCheck(feature[1])} />
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
                      <input type='checkbox' name={`service-${service[0]}`} id={service[1]} defaultChecked={service[2]} onChange={() => onServicesCheck(service[1])} />
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
