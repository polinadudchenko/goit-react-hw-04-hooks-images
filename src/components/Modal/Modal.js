import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import{StyledOverlay, StyledModal} from './Modal.styled'

const modalRoot = document.getElementById('modal-root')

export default function Modal ({onClose, children}) {
  
  useEffect(() => {
    window.addEventListener('keydown', handleEscape)

    return (() => window.removeEventListener('keydown', handleEscape))
  }, [])

  const handleEscape = (e) => {
    if (e.code === 'Escape') {
      
        onClose()
    }
  }

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (createPortal(<StyledOverlay onClick={handleClose}>
        <StyledModal>
          {children}
        </StyledModal>
      </StyledOverlay>, modalRoot) )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
  }