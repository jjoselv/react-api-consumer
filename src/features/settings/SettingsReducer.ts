import config from '../../config';
import {SETTINGS_ACTION_TYPE, SET_NATIONALITY} from './actionTypes';

export interface SettingsState {
  nationality: string
}

const initialState: SettingsState = {
  nationality: config.defaultNationality,
};

function reducer(state = initialState, action: SETTINGS_ACTION_TYPE): SettingsState {
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
