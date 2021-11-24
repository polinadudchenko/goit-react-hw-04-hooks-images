import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { StyledGallery } from './ImageGallery.styled';



function ImageGallery({images, onHandleLoadBtn, onHandleModal}) {
  
  return <>
    <StyledGallery>
        <ImageGalleryItem images={images} onImgClick={ onHandleModal}/>
    </StyledGallery>
    </>
}

ImageGallery.defaultProps = {
  galleryImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZWyg5k6Y2X4OaOfDMPcFaAwL9r_eN34CUXbEgCEjMepep7WMua2z90y_DGL0YobiBjRY&usqp=CAU',
  modalImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png',
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      galleryImg: PropTypes.string,
      modalImg: PropTypes.string,
      tags: PropTypes.string.isRequired,
    })),
    onHandleModal: PropTypes.func.isRequired,
    onHandleLoadBtn: PropTypes.func.isRequired,
  }  
export default ImageGallery