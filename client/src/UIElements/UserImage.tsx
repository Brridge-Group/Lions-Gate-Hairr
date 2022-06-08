import './UserImage.css'
import { AiFillCamera } from 'react-icons/ai'

const UserImage = ({ pic, name, handleChange }) => (
  <>
    <img
      src={pic || 'https://imgur.com/LDpwLVZ.jpg'}
      alt={name}
      className='UserImage-pic'
    />
    <div className='fileUpload btn btn-primary'>
      <span>
        <AiFillCamera style={{ fontSize: '2rem' }} />
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
