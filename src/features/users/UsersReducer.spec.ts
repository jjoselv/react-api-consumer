import {GET_USERS, GET_NEXT_BATCH} from './actionTypes';
import type {SetUsersAction, SetUsersNextBatchAction, USERS_ACTION_TYPE, PromiseActions} from './actionTypes';

import UsersReducer from './UsersReducer';
import type {User} from '../../components/Users/Users';

describe('features > users > UsersReducer', () => {
  it('returns initial state, if non matched action is dispatched', () => {
    const initialState = {
      users: undefined,
      isLoading: false,
      hasError: false,
      isFulfilled: false,
      page: 0
    };

    const action = {
      type: 'FOO',
    };

    expect(UsersReducer(initialState, action as USERS_ACTION_TYPE)).toBe(initialState);
  });

  it.each([
    [`${GET_USERS}_FULFILLED` as `${typeof GET_USERS}_${PromiseActions}`],
    [`${GET_USERS}_PENDING` as `${typeof GET_USERS}_${PromiseActions}`],
    [`${GET_USERS}_REJECTED` as `${typeof GET_USERS}_${PromiseActions}`],
  ])(`updates state according to dispatched action %s`, actionType => {
    const initialState = {
      users: undefined,
      isLoading: false,
      hasError: false,
      isFulfilled: false,
      page: 1,
    };

    const payload: SetUsersAction["payload"] | undefined =
      actionType === `${GET_USERS}_FULFILLED`
        ? {
            data: {
              results: [{email: 'asdf@asdf.com'} as User],
              info: {
                page: 2,
              },
            },
          }
        : undefined;

    const action = {
      type: actionType,
      payload,
    };

    expect(UsersReducer(initialState, action as SetUsersAction)).toMatchSnapshot();
  });

  it.each([
    [`${GET_NEXT_BATCH}_FULFILLED` as `${typeof GET_NEXT_BATCH}_${PromiseActions}`],
    [`${GET_NEXT_BATCH}_PENDING` as `${typeof GET_NEXT_BATCH}_${PromiseActions}`],
    [`${GET_NEXT_BATCH}_REJECTED` as `${typeof GET_NEXT_BATCH}_${PromiseActions}`],
  ])(`updates state according to dispatched action %s`, actionType => {
    const initialState = {
      users: [{email: "fdsa@ffff.com"}] as User[],
      isLoading: false,
      hasError: false,
      isFulfilled: false,
      page: 1,
    };

    const payload: SetUsersAction["payload"] | undefined =
      actionType === `${GET_NEXT_BATCH}_FULFILLED`
        ? {
            data: {
              results: [{email: 'asdf@asdf.com'} as User],
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

    expect(UsersReducer(initialState, action as SetUsersNextBatchAction)).toMatchSnapshot();
  });
});
