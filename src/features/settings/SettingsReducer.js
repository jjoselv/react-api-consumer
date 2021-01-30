import config from '../../config';
import {SET_NATIONALITY} from './actionTypes';

const initialState = {
  nationality: config.defaultNationality,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NATIONALITY:
      return {
        nationality: action.payload,
      };

    default:
      return state;
  }
};


export default reducer;
