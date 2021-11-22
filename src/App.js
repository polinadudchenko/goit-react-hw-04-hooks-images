import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import fetchApi from './sevicies/fetch-api';
import mapper from './sevicies/mapper';
import {StyledApp, StyledModalImg} from './App.styled';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';
import Modal from './components/Modal';
import Loader from './components/Loader';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';

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
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    fetchImage();
  }, [query] )  
  
  const fetchImage = () => {
    if (query === '') {
      return
    }
    fetchApi(query, page).then(response => {
      const newImages = mapper(response.hits);
      setImages(images => [...images, ...newImages]);
      setStatus(Status.RESOLVED);
      setPage(page => page + 1)
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }).catch(error => {
      setError(error);
      setStatus(Status.REJECTED)
      toast.error(error)
    })
  }

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  }

  const toggleModal = () => {
    setShowNodal(showModal => !showModal)
  }

  const openModal = (modalImg) => {
    setModalImg(modalImg)
  }

  const handleLoadButton = () => {
    fetchImage()
  }
  
  const handleModal = (e) => {
    openModal(e.target.dataset.modal);
    toggleModal();
  }


  return <StyledApp>
      <Searchbar onSubmit={handleSubmit} />
      {(status === Status.PENDING && query)&& <Loader />}
      {status === Status.RESOLVED &&
        <ImageGallery images={images}  onHandleModal={handleModal} onHandleLoadBtn={handleLoadButton} />
      }
      {showModal && <Modal onClose={toggleModal}><StyledModalImg src={modalImg} alt={query} /></Modal>}
      <ToastContainer autoClose={3000}/>
    </StyledApp> 
}
