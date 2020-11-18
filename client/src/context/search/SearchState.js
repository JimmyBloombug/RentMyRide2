import React, { useReducer } from 'react';

import SearchContext from './searchContext';
import SearchReducer from './searchReducer';

import {} from '../types';

export const SearchState = (props) => {
  const initialState = {};

  const [state, dispatch] = useReducer(SearchReducer, initialState);

  return (
    <SearchContext.Provider value={{}}>{props.children}</SearchContext.Provider>
  );
};
