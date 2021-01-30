import {GET_NEXT_BATCH, GET_USERS} from './actionTypes';

const initialState = {
  users: undefined,
  isLoading: false,
  hasError: false,
  isFulfilled: false,
  page: 1,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USERS}_PENDING`:
      return {
        ...state,
        isFulfilled: false,
        isLoading: true,
        hasError: false,
        users: undefined,
      };

    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        isFulfilled: true,
        isLoading: false,
        hasError: false,
        users: action.payload.data?.results,
        page: action.payload.data?.info?.page,
      };

    case `${GET_USERS}_REJECTED`:
      return {
        ...state,
        isFulfilled: false,
        isLoading: false,
        hasError: true,
        users: undefined,
      };

    case `${GET_NEXT_BATCH}_PENDING`:
      return {
        ...state,
        isFulfilled: false,
        isLoading: true,
        hasError: false,
      };
    case `${GET_NEXT_BATCH}_FULFILLED`:
      return {
        ...state,
        isFulfilled: true,
        isLoading: false,
        hasError: false,
        users: [...state.users, ...action.payload.data.results],
        page: action.payload.data?.info?.page,
      };

    case `${GET_NEXT_BATCH}_REJECTED`:
      return {
        ...state,
        isFulfilled: false,
        isLoading: false,
        hasError: true,
      };

    default:
      return state;
  }
};

export default reducer;
