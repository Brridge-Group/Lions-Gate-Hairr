// import { Image } from '@chakra-ui/react'
import { AddAPhotoRounded } from '@material-ui/icons'
import './UserImage.css'

const UserImage = ({ pic, name, handleChange }) => (
  <>
    <img
      src={pic || 'https://imgur.com/LDpwLVZ.jpg'}
      alt={name}
      className='UserImage-pic'
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
