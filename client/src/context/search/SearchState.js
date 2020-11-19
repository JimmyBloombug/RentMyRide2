import React, { useReducer } from 'react';

import SearchContext from './searchContext';
import SearchReducer from './searchReducer';

import {} from '../types';

const SearchState = (props) => {
  const initialState = {
    location: {},
    checkIn: new Date(),
    checkOut: new Date(),
  };

  const [state, dispatch] = useReducer(SearchReducer, initialState);

  // Set Value
  const setValue = (type, data) => {
    dispatch({
      type: type,
      payload: data,
    });
  };

  return (
    <SearchContext.Provider
      value={{
        location: state.location,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        setValue,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
