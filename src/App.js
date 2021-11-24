import { useEffect, useState, useCallback} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import fetchApi from './sevicies/fetch-api';
import mapper from './sevicies/mapper';
import {StyledApp, StyledModalImg} from './App.styled';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Searchbar from './components/Searchbar';
import Modal from './components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from "react-loader-spinner";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App () {
  const [query, setQuery] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowNodal] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);

  const fetchImage = useCallback(() => {
    if (query === '') {
      return
    }
      fetchApi(query, page).then(response => {
        const newImages = mapper(response.hits);
        setImages(images => [...images, ...newImages]);
        setStatus(Status.RESOLVED);
      }).then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        })
      }).catch(error => {
        setStatus(Status.REJECTED)
        toast.error(error)
      })
  }, [query, page])

  useEffect(() => {
    fetchImage()
    
  }, [fetchImage])

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setStatus(Status.PENDING);
  }

  const toggleModal = () => {
    setShowNodal(showModal => !showModal)
  }

  const handleLoadButton = () => {
    setPage(page => page + 1)
    setStatus(Status.PENDING)
  }
  
  const handleModal = (e) => {
    setModalImg(e.target.dataset.modal);
    toggleModal();
  }


  return <StyledApp>
    <Searchbar onSubmit={handleSubmit} />
    <ImageGallery images={images} onHandleModal={handleModal} onHandleLoadBtn={fetchImage} />
      {status === Status.RESOLVED && <Button loadMoreImages={handleLoadButton} />}
      {status === Status.PENDING && <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={100}
        width={100}
        timeout={3000}
        style={{ textAlign: 'center' }} 
      />}    
      {showModal && <Modal onClose={toggleModal}><StyledModalImg src={modalImg} alt={query} /></Modal>}
      <ToastContainer autoClose={3000}/>
    </StyledApp> 
}
