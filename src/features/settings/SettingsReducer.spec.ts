import {SET_NATIONALITY} from './actionTypes';
import type {SetNationalityAction, SETTINGS_ACTION_TYPE} from './actionTypes';

import SettingsReducer from './SettingsReducer';

describe('features > settings > SettingsReducer', () => {
  it('returns initial state, if non matched action is dispatched', () => {
    const initialState = {
      nationality: 'ch',
    };

    const action = {
      type: 'FOO',
    };

    expect(SettingsReducer(initialState, action as SETTINGS_ACTION_TYPE)).toBe(initialState);
  });

  it(`updates state according to dispatched action`, () => {
    const initialState = {
      nationality: 'ch',
    };

    const payload = 'es';

    const action: SetNationalityAction = {
      type: SET_NATIONALITY,
      payload,
    };

    expect(SettingsReducer(initialState, action)).toMatchSnapshot();
  });
});
