import {GET_USERS} from './actionTypes';
import UsersReducer from './UsersReducer';

describe('features > users > UsersReducer', () => {
  it('returns initial state, if non matched action is dispatched', () => {
    const initialState = {
      isLoading: false,
      hasError: false,
      isFulfilled: false,
    };

    const action = {
      type: 'FOO',
    };

    expect(UsersReducer(initialState, action)).toBe(initialState);
  });

  /**
   * Provide table of values to run test case against
   * @see https://jestjs.io/docs/en/api#testeachtablename-fn-timeout
   */
  it.each([
    [`${GET_USERS}_FULFILLED`],
    [`${GET_USERS}_PENDING`],
    [`${GET_USERS}_REJECTED`],
  ])(`updates state according to dispatched action`, actionType => {
    const initialState = {
      users: undefined,
      isLoading: false,
      hasError: false,
      isFulfilled: false,
      page: 1,
    };

    const payload =
      actionType === `${GET_USERS}_FULFILLED`
        ? {
            data: {
              results: [{a: 2}],
              info: {
                page: 42,
              },
            },
          }
        : undefined;

    const action = {
      type: actionType,
      payload,
    };

    expect(UsersReducer(initialState, action)).toMatchSnapshot();
  });
});
