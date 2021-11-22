import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import { useState } from 'react';
import {StyledSearchbar, StyledSearchForm, StyledSearchBtn, StyledSearchBtnLabel, StyledSearchInput} from './Searchbar.styled'

export default function Searchbar ({onSubmit}) {
  const [input, setInput] = useState('');
 
  const handleChange = (e) => {
    setInput(e.currentTarget.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === '') {
      toast.info('Please type a query')
      return
    }

    onSubmit(input);
    setInput('')
  }

  return <StyledSearchbar>
    <StyledSearchForm onSubmit={handleSubmit}>
      <StyledSearchBtn type="submit">
        <StyledSearchBtnLabel>Search</StyledSearchBtnLabel>
      </StyledSearchBtn>

        <StyledSearchInput
          type="text"
          onChange={handleChange}
          value={input}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        />
    </StyledSearchForm>
  </StyledSearchbar>
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }