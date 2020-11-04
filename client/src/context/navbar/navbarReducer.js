import { SET_MENU } from '../types';

const NavbarReducer = (state, action) => {
  switch (action.type) {
    // open menu
    case SET_MENU:
      return {
        ...state,
        menuOpen: action.payload,
      };
  }
};

export default NavbarReducer;
