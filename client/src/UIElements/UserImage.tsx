import { Image } from '@chakra-ui/react';
import { AddAPhotoRounded } from '@material-ui/icons'
import './UserImage.css'

const UserImage = ({ pic, name, handleChange }) => (
  <>
  <Image
    src={
      pic ||
      'https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png'
    }
    alt={name}
    boxSize="150px"
    borderRadius="25rem"
    fallbackSrc="https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png"
  />
  <div className="fileUpload btn btn-primary">
    <span><AddAPhotoRounded fontSize="large"/></span>
    <input id="uploadBtn" type="file" className="upload" onChange= {handleChange} />
  </div>
  </>
  
);

export default UserImage;
