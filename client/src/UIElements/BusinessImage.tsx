import './UserImage.css'
import { AiFillCamera } from 'react-icons/ai'

const BusinessImage = ({ pic, name, handleChange }) => (
  <>
    <img
      src={
        pic ||
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
      }
      alt={name}
      className='BusinessImage-pic'
    />
    <div className='fileUpload btn btn-primary business'>
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

export default BusinessImage
