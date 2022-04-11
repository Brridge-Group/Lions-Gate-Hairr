import { Image } from '@chakra-ui/react'
import { AddAPhotoRounded } from '@material-ui/icons'
import './UserImage.css'

const UserImage = ({ pic, name, handleChange }) => (
  <>
    <Image
      src={pic || 'https://imgur.com/LDpwLVZ.jpg'}
      alt={name}
      boxSize='150px'
      borderRadius='25rem'
      fallbackSrc='https://imgur.com/LDpwLVZ.jpg'
    />
    <div className='fileUpload btn btn-primary'>
      <span>
        <AddAPhotoRounded fontSize='large' />
      </span>
      <input
        id='uploadBtn'
        type='file'
        className='upload'
        onChange={handleChange}
      />
    </div>
  </>
)

export default UserImage
